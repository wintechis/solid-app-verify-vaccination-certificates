import { Injectable } from "@nestjs/common";
import { ProofGenerationRequest } from "./proof-generation.request";
import { Session } from "@inrupt/solid-client-authn-node";
import {
  createSolidDataset,
  getSolidDataset,
  getThingAll,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import {
  PersonDeserializer,
  Vaccination,
  VaccinationDeserializer,
  VaccinationProofSerializer,
} from "@solid-app-verifiable-credentials/vaccination-data";
import { LazyThing } from "@solid-app-verifiable-credentials/solid";
import UuidGenerator from "@inrupt/solid-client-authn-node/dist/util/UuidGenerator";

@Injectable()
export class AppService {
  async generateProof(
    proofGenerationRequest: ProofGenerationRequest
  ): Promise<string> {
    const session = new Session();
    await session.login({
      oidcIssuer: "https://login.inrupt.com",
      clientId: "699db7e5-97fe-4f0d-b913-1293a1a28e8e",
      clientSecret: "ebcab5e3-4d17-4598-b6cc-81644511885b",
    });
    if (!session.info.isLoggedIn) {
      throw new Error("Login failed");
    }

    const ds = await getSolidDataset(proofGenerationRequest.vaccinationsUri, {
      fetch: session.fetch,
    });

    const things = getThingAll(ds);
    const deserializer = new VaccinationDeserializer();
    const vaccinations = things
      .filter((thing) => deserializer.checkType(thing))
      .reduce((map, thing) => {
        const vaccination = deserializer.deserialize(thing);
        map.set(thing.url, vaccination);
        return map;
      }, new Map<string, Vaccination>());

    if (this.checkVaccinationsValidity(vaccinations, proofGenerationRequest)) {
      return await this.saveProof(
        vaccinations,
        session,
        proofGenerationRequest
      );
    }

    throw "Vaccinations not valid";
  }

  private checkVaccinationsValidity(
    vaccinations: Map<string, Vaccination>,
    request: ProofGenerationRequest
  ): boolean {
    const vaccArr = Array.from(vaccinations.values());
    return (
      vaccArr.filter((value) => value.vaccinatedPerson.url === request.webId)
        .length >= 3
    );
  }

  private async saveProof(
    vaccinations: Map<string, Vaccination>,
    session: Session,
    request: ProofGenerationRequest
  ): Promise<string> {
    var ds = createSolidDataset();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 14);
    const proof = new VaccinationProofSerializer().serialize({
      vaccinatedPerson: new LazyThing(request.webId, PersonDeserializer),
      verifiedByAuthority: new LazyThing(
        session.info.webId,
        PersonDeserializer
      ),
      expiryDate: expiryDate,
    });

    ds = setThing(ds, proof);
    const uuid = new UuidGenerator().v4();
    const datasetUrl =
      "https://storage.inrupt.com/eeef9494-8c04-4133-a116-7382c0e69659/vaccination-proofs/" +
      uuid;
    await saveSolidDatasetAt(datasetUrl, ds, { fetch: session.fetch });
    return datasetUrl;
  }
}

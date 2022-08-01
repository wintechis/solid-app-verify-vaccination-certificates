import { Injectable } from "@nestjs/common";
import { ProofGenerationRequest } from "./proof-generation.request";
import { Session } from "@inrupt/solid-client-authn-node";
import { getSolidDataset, getThingAll } from "@inrupt/solid-client";
import {
  Vaccination,
  VaccinationDeserializer,
} from "@solid-app-verifiable-credentials/vaccination-data";

@Injectable()
export class AppService {
  async generateProof(
    proofGenerationRequest: ProofGenerationRequest
  ): Promise<string> {
    const session = new Session();
    await session.login({
      oidcIssuer: "https://login.inrupt.com",
      clientId: "#",
      clientSecret: "#",
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

    console.dir(vaccinations);

    return "url to vaccination proof";
  }
}

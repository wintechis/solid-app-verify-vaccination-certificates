import { Injectable } from "@angular/core";
import { SessionService } from "@solid-app-verifiable-credentials/auth";
import {
  createSolidDataset,
  getThingAll,
  removeThing,
  setThing,
  Thing,
} from "@inrupt/solid-client";
import {
  Vaccination,
  VaccinationDeserializer,
  VaccinationSerializer,
} from "./vaccination.rdf";
import { LazyThing } from "@solid-app-verifiable-credentials/solid";
import { PersonDeserializer } from "./person.rdf";
import { VaccineDeserializer } from "./vaccine.rdf";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(private sessionService: SessionService) {}

  get webId(): string | undefined {
    return this.sessionService.session.info.webId;
  }

  async storeVaccinationDocument(
    vaccinationUrl: string,
    numberOfVaccination: number,
    dateOfVaccination: string
  ) {
    const url = await this.getVaccinationThingUrl();

    let ds = await this.sessionService
      .getDataSet(url.toString())
      .catch((reason) => {
        if (reason.response?.status == 404) {
          return createSolidDataset();
        }
        throw reason;
      });

    const newThing = new VaccinationSerializer().serialize({
      vaccine: new LazyThing(vaccinationUrl, VaccineDeserializer),
      numberOfVaccination: numberOfVaccination,
      dateOfVaccination: new Date(dateOfVaccination),
      vaccinatedPerson: new LazyThing(this.webId!, PersonDeserializer),
    });

    ds = setThing(ds, newThing);
    await this.sessionService.saveDataSet(url.toString(), ds);
  }

  private async getVaccinationThingUrl() {
    const url = await this.sessionService.storageRootUrl;
    url.pathname += "vaccinations";
    return url;
  }

  async getVaccinationDocuments(): Promise<Map<string, Vaccination>> {
    const solidDataset = await this.sessionService
      .getDataSet((await this.getVaccinationThingUrl()).toString())
      .catch((reason) => {
        if (reason.response?.status == 404) {
          return createSolidDataset();
        }
        throw reason;
      });

    const things: Thing[] = getThingAll(solidDataset);

    const serializer = new VaccinationDeserializer();

    return things
      .filter((thing) => serializer.checkType(thing))
      .reduce((map, thing) => {
        const vaccination = serializer.deserialize(thing);
        map.set(thing.url, vaccination);
        return map;
      }, new Map<string, Vaccination>());
  }

  async deleteVaccination(vaccinationUrl: string) {
    let ds = await this.sessionService.getDataSet(
      (await this.getVaccinationThingUrl()).toString()
    );

    ds = removeThing(ds, vaccinationUrl);

    await this.sessionService.saveDataSet(vaccinationUrl, ds);
  }
}

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
  PersonDeserializer,
  Vaccination,
  VaccinationDeserializer,
  VaccinationSerializer,
  VaccineDeserializer,
} from "@solid-app-verifiable-credentials/vaccination-data";
import { LazyThing } from "@solid-app-verifiable-credentials/solid";

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

    const deserializer = new VaccinationDeserializer();

    return things
      .filter((thing) => deserializer.checkType(thing))
      .reduce((map, thing) => {
        const vaccination = deserializer.deserialize(thing);
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

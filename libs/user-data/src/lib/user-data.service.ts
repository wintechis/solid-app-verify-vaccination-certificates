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
  Nullable,
  VaccinationDocument,
  VaccinationDocumentThingFactory,
} from "./vaccination-document";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(private sessionService: SessionService) {}

  get webId(): string | undefined {
    return this.sessionService.session.info.webId;
  }

  async storeVaccinationDocument(
    vaccinationName: string,
    vaccinationType: string,
    manufacturer: string,
    numberOfVaccination: number,
    dateOfVaccination: string
  ) {
    const url = this.getVaccinationThingUrl();

    let ds = await this.sessionService
      .getDataSet(url.toString())
      .catch((reason) => {
        if (reason.response?.status == 404) {
          return createSolidDataset();
        }
        throw reason;
      });

    const newThing = VaccinationDocumentThingFactory.fromVaccinationDocument({
      vaccine: vaccinationName,
      type: vaccinationType,
      manufacturer: manufacturer,
      numberOfVaccination: numberOfVaccination,
      dateOfVaccination: new Date(dateOfVaccination),
    });

    ds = setThing(ds, newThing);
    await this.sessionService.saveDataSet(url.toString(), ds);
  }

  private getVaccinationThingUrl() {
    const session = this.sessionService.session;
    if (session.info.webId == undefined)
      throw new Error("webId is empty - please refresh the page and login");

    const url = new URL(session.info.webId);
    url.hash = "";
    url.pathname = url.pathname.substring(0, url.pathname.lastIndexOf("/")); // Walk path up
    url.pathname = url.pathname.substring(0, url.pathname.lastIndexOf("/")); // Walk path up
    url.pathname += "/vaccinations";
    return url;
  }

  async getVaccinationDocuments(): Promise<
    Map<string, Nullable<VaccinationDocument>>
  > {
    const solidDataset = await this.sessionService
      .getDataSet(this.getVaccinationThingUrl().toString())
      .catch((reason) => {
        if (reason.response?.status == 404) {
          return createSolidDataset();
        }
        throw reason;
      });

    const things: Thing[] = getThingAll(solidDataset);

    return things.reduce((map, thing) => {
      const vaccination = VaccinationDocumentThingFactory.fromThing(thing);
      if (vaccination.vaccine && vaccination.type) {
        map.set(thing.url, vaccination);
      }
      return map;
    }, new Map<string, Nullable<VaccinationDocument>>());
  }

  async deleteVaccination(vaccinationUrl: string) {
    var ds = await this.sessionService.getDataSet(
      this.getVaccinationThingUrl().toString()
    );

    ds = removeThing(ds, vaccinationUrl);

    await this.sessionService.saveDataSet(vaccinationUrl, ds);
  }
}

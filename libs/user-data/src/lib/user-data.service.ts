import { Injectable } from "@angular/core";
import { SessionService } from "@solid-app-verifiable-credentials/auth";
import {
  buildThing,
  createThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";

export interface VaccinationDocument {
  vaccine: string;
  type: string;
  manufacturer: string;
  numberOfVaccination: number;
  dateOfVaccination: Date;
}

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(private sessionService: SessionService) {}

  get webId(): string | undefined {
    return this.sessionService.session.info.webId;
  }

  async storeVaccinationDocument() {
    if (this.sessionService.session.info.webId == undefined) return;
    const url = new URL(this.sessionService.session.info.webId);
    url.hash = "";

    let ds = await this.sessionService.getDataSet(
      "https://pod.inrupt.com/wiesnery/solvercred"
    );
    const newThing = buildThing(createThing({ name: "vaccine1" }))
      .addStringNoLocale("http://my-own.org/vaccine/name", "Comirnaty")
      .build();

    ds = setThing(ds, newThing);

    const saved = await saveSolidDatasetAt(
      "https://pod.inrupt.com/wiesnery/solvercred",
      ds,
      {
        fetch: this.sessionService.session.fetch,
      }
    );
  }

  get vaccinationDocuments(): VaccinationDocument[] {
    return [
      {
        vaccine: "Comirnaty",
        type: "SARS-CoV-2 mRNA vaccine",
        manufacturer: "Biontech Manufacturing GmbH",
        numberOfVaccination: 3,
        dateOfVaccination: new Date(2021, 12, 20),
      },
      {
        vaccine: "Comirnaty",
        type: "SARS-CoV-2 mRNA vaccine",
        manufacturer: "Biontech Manufacturing GmbH",
        numberOfVaccination: 2,
        dateOfVaccination: new Date(2021, 7, 19),
      },
    ];
  }
}

import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../user-data.service";
import { Nullable, VaccinationDocument } from "../vaccination-document";

@Component({
  selector: "solid-app-verifiable-credentials-user-data",
  templateUrl: "./user-data.component.html",
  styleUrls: ["./user-data.component.scss"],
})
export class UserDataComponent implements OnInit {
  webId? = this.userDataService.webId;
  vaccinations = new Map<string, Nullable<VaccinationDocument>>();
  vaccinationName: string = "Comirnaty";
  vaccinationType: string = "SARS-CoV-2 mRNA vaccine";
  manufacturer: string = "Biontech Manufacturing GmbH";
  numberOfVaccination: string = "3";
  dateOfVaccination: string = new Date().toLocaleDateString("en-CA"); // Use this format to make the browser pickup the current date value as default value

  constructor(private userDataService: UserDataService) {
    this.loadVaccinations();
  }

  ngOnInit(): void {}

  private async loadVaccinations() {
    this.vaccinations = await this.userDataService.getVaccinationDocuments();
  }

  async deleteVaccination(vaccinationUrl: string) {
    await this.userDataService.deleteVaccination(vaccinationUrl);
    await this.loadVaccinations();
  }

  async saveNewVaccination() {
    await this.userDataService.storeVaccinationDocument(
      this.vaccinationName,
      this.vaccinationType,
      this.manufacturer,
      Number(this.numberOfVaccination),
      this.dateOfVaccination
    );
    await this.loadVaccinations();
  }
}

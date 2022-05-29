import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../user-data.service";

@Component({
  selector: "solid-app-verifiable-credentials-user-data",
  templateUrl: "./user-data.component.html",
  styleUrls: ["./user-data.component.scss"],
})
export class UserDataComponent implements OnInit {
  webId? = this.userDataService.webId;
  vaccinations = this.userDataService.vaccinationDocuments;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {}

  doIT() {
    this.userDataService.storeVaccinationDocument();
  }
}

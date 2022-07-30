import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../user-data.service";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  AddVaccination,
  DeleteVaccination,
  LoadVaccinations,
} from "../state/vaccination.actions";
import { VaccineModel } from "../state/vaccine.state-model";
import { VaccineState } from "../state/vaccine.state";
import { VaccinationStateModel } from "../state/vaccination.state-model";
import { VaccinationState } from "../state/vaccination.state";

@Component({
  selector: "solid-app-verifiable-credentials-user-data",
  templateUrl: "./user-data.component.html",
  styleUrls: ["./user-data.component.scss"],
})
export class UserDataComponent implements OnInit {
  webId? = this.userDataService.webId;

  vaccinations$: Observable<VaccinationStateModel[]>;
  vaccines$: Observable<Map<string, VaccineModel>>;
  vaccine = "Comirnaty";
  numberOfVaccination = "3";
  dateOfVaccination: string = new Date().toLocaleDateString("en-CA"); // Use this format to make the browser pickup the current date value as default value

  constructor(private userDataService: UserDataService, private store: Store) {
    this.vaccinations$ = this.store.select(VaccinationState.vaccinations);
    this.vaccines$ = this.store.select(VaccineState.vaccines);
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadVaccinations());
  }

  deleteVaccination(vaccinationUrl: string) {
    this.store.dispatch(new DeleteVaccination(vaccinationUrl));
  }

  async saveNewVaccination() {
    this.store.dispatch(
      new AddVaccination(
        "https://storage.inrupt.com/eb61cfd6-3b92-4239-9299-af767db50d29/public/vaccines.ttl#biontech-comirnaty",
        Number(this.numberOfVaccination),
        this.dateOfVaccination
      )
    );
  }
}

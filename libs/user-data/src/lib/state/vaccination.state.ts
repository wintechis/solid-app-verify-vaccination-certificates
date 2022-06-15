import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import {
  AddVaccination,
  DeleteVaccination,
  LoadVaccinations,
} from "./vaccination.actions";
import { UserDataService } from "../user-data.service";
import { VaccinationStateModel } from "./vaccination.state-model";
import { LoadVaccine } from "./vaccine.actions";

@State<VaccinationStateModel[]>({
  name: "vaccinations",
  defaults: [],
})
@Injectable()
export class VaccinationState {
  constructor(private userDataService: UserDataService) {}

  @Selector()
  static vaccinations(state: VaccinationStateModel[]) {
    return state;
  }

  @Action(LoadVaccinations)
  async loadVaccinations(ctx: StateContext<VaccinationStateModel[]>) {
    const vaccinationMap = await this.userDataService.getVaccinationDocuments();
    const vaccinations = [...vaccinationMap.entries()].map((key) => {
      return {
        url: key[0],
        vaccine: key[1].vaccine.url.toString(),
        numberOfVaccination: key[1].numberOfVaccination,
        dateOfVaccination: key[1].dateOfVaccination,
        vaccinatedPerson: key[1].vaccinatedPerson.url.toString(),
      };
    });
    vaccinations.forEach((value) => {
      ctx.dispatch(new LoadVaccine(value.vaccine));
    });
    ctx.setState(vaccinations);
  }

  @Action(DeleteVaccination)
  async deletevaccination(
    ctx: StateContext<VaccinationStateModel[]>,
    action: DeleteVaccination
  ) {
    await this.userDataService.deleteVaccination(action.url);
    ctx.dispatch(new LoadVaccinations());
  }

  @Action(AddVaccination)
  async addVaccination(
    ctx: StateContext<VaccinationStateModel[]>,
    action: AddVaccination
  ) {
    await this.userDataService.storeVaccinationDocument(
      action.vaccineUrl,
      action.numberOfVaccination,
      action.dateOfVaccination
    );
    ctx.dispatch(new LoadVaccinations());
  }
}

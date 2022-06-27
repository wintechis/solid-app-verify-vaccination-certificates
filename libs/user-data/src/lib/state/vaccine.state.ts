import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { LoadVaccine } from "./vaccine.actions";
import { VaccineModel, VaccineStateModel } from "./vaccine.state-model";
import { LazyThing } from "@solid-app-verifiable-credentials/solid";
import { VaccineDeserializer } from "../vaccine.rdf";

@State<VaccineStateModel>({
  name: "vaccines",
  defaults: { vaccines: [] },
})
@Injectable()
export class VaccineState {
  @Selector()
  static vaccines(state: VaccineStateModel): Map<string, VaccineModel> {
    return state.vaccines.reduce(
      (previousValue, currentValue) =>
        previousValue.set(currentValue.url, currentValue),
      new Map<string, VaccineModel>()
    );
  }

  @Action(LoadVaccine)
  async loadVaccines(
    ctx: StateContext<VaccineStateModel>,
    action: LoadVaccine
  ) {
    if (ctx.getState().vaccines.some((vaccine) => vaccine.url == action.url))
      return;
    const lazyVaccine = new LazyThing(action.url, VaccineDeserializer);
    const vaccine = await lazyVaccine.get();

    if (vaccine) {
      ctx.setState((state: VaccineStateModel) => {
        state.vaccines.push({ ...vaccine, url: action.url });
        return state;
      });
    }
  }
}

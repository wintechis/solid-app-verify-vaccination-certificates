import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { AuthorizationStateModel } from "./authorization.state-model";
import { LoadAccess } from "./authorization.actions";
import { AuthorizationService } from "../authorization.service";
import { ImmutableContext, ImmutableSelector } from "@ngxs-labs/immer-adapter";
import { Injectable } from "@angular/core";

@State<AuthorizationStateModel>({
  name: "AuthorizationState",
  defaults: { publicAccess: {}, agentAccess: {} },
})
@Injectable()
export class AuthorizationState {
  constructor(private authorizationService: AuthorizationService) {}

  @Selector()
  @ImmutableSelector()
  static getAgentsWithReadAccess(
    state: AuthorizationStateModel
  ): { webId: string }[] {
    const webIds = [];
    for (const webId in state.agentAccess) {
      //if (state.agentAccess[webId].read) {
      webIds.push(webId);
      //}
    }
    return webIds.map((webId) => ({ webId: webId }));
  }

  @Action(LoadAccess)
  @ImmutableContext()
  async loadAccess(ctx: StateContext<AuthorizationStateModel>) {
    const agentAccess = await this.authorizationService.getAgentAccessAll();
    if (agentAccess) {
      ctx.setState((state: AuthorizationStateModel) => {
        state.agentAccess = agentAccess;
        return state;
      });
    }
  }
}

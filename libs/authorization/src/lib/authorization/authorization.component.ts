import { Component, OnInit } from "@angular/core";
import { AuthorizationService } from "../authorization.service";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AuthorizationState } from "../state/authorization.state";
import { GrantAccess, LoadAccess } from "../state/authorization.actions";

@Component({
  selector: "solid-app-verifiable-credentials-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.scss"],
})
export class AuthorizationComponent implements OnInit {
  public agentAccess$: Observable<{ webId: string }[]>;
  webIdToShare: string = "https://pod.inrupt.com/guestaccess/profile/card#me";
  constructor(
    private authorizationService: AuthorizationService,
    private store: Store
  ) {
    this.agentAccess$ = this.store.select(
      AuthorizationState.getAgentsWithReadAccess
    );
  }

  grantAccess() {
    this.store.dispatch(new GrantAccess(this.webIdToShare));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadAccess());
  }
}

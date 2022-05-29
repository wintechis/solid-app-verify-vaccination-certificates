import { Injectable } from "@angular/core";
import { ISessionInfo, Session } from "@inrupt/solid-client-authn-browser";
import { getSolidDataset, SolidDataset } from "@inrupt/solid-client";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private _session = new Session();

  constructor() {}

  handleLoginRedirect(): Promise<ISessionInfo | undefined> {
    return this.session.handleIncomingRedirect({
      restorePreviousSession: true,
    });
  }

  get isLoggedIn(): boolean {
    return this.session.info.isLoggedIn;
  }

  get session(): Session {
    return this._session;
  }

  getDataSet(url: string): Promise<SolidDataset> {
    return getSolidDataset(url, { fetch: this._session.fetch });
  }
}

import { Injectable } from "@angular/core";
import { Session } from "@inrupt/solid-client-authn-browser";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private _session = new Session();

  constructor() {}

  async handleLoginRedirect() {
    await this.session.handleIncomingRedirect(window.location.href);
  }

  get isLoggedIn(): boolean {
    return this.session.info.isLoggedIn;
  }

  get session(): Session {
    return this._session;
  }
}

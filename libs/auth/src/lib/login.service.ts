import { Injectable } from "@angular/core";
import { Session } from "@inrupt/solid-client-authn-browser";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  APP_CLIENT_NAME = "SOLVERCRED";

  constructor() {}

  async login(oidcIssuer: string) {
    await new Session().login({
      oidcIssuer,
      clientName: this.APP_CLIENT_NAME,
      redirectUrl: window.location.origin,
    });
  }
}

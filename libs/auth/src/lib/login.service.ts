import { Injectable } from "@angular/core";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  APP_CLIENT_NAME = "SOLVERCRED";

  constructor() {}

  async login(oidcIssuer: string, target?: string) {
    await getDefaultSession().login({
      oidcIssuer,
      clientName: this.APP_CLIENT_NAME,
      redirectUrl: window.location.origin + (target ?? "/"),
    });
  }
}

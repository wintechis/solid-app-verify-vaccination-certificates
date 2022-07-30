import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class GrantAccessStorer implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (state.url.includes("requestAccess")) {
      const url = new URL(state.url, location.origin);
      const redirectUri = url.searchParams.get("redirectUri");
      if (redirectUri) {
        localStorage.setItem("redirectUri", redirectUri);
      }
      const webId = url.searchParams.get("webId");
      if (webId) {
        localStorage.setItem("webId", webId);
      }
    }
    return true;
  }
}

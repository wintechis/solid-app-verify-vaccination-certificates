import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class GrantAccessLoader
  implements Resolve<{ redirectUri: string | null; webId: string | null }>
{
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): { redirectUri: string | null; webId: string | null } {
    return {
      webId: localStorage.getItem("webId"),
      redirectUri: localStorage.getItem("redirectUri"),
    };
  }
}

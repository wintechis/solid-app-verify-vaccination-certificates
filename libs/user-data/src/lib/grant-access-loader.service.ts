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
    const url = new URL(state.url, location.origin);
    const redirectUri = url.searchParams.get("redirectUri");
    const webId = url.searchParams.get("webId");
    return {
      webId: webId,
      redirectUri: redirectUri,
    };
  }
}

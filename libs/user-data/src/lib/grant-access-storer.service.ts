import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class GrantAccessStorer implements Resolve<boolean> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.url.toString().includes("requestAccess")) {
      if (route.queryParams["redirectUri"]) {
        localStorage.setItem("redirectUri", route.queryParams["redirectUri"]);
      }
      if (route.queryParams["webId"]) {
        localStorage.setItem("webId", route.queryParams["webId"]);
      }
    }
    return true;
  }
}

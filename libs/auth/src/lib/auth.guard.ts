import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { SessionService } from "./session/session.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const info = await this.sessionService.handleLoginRedirect();
    if (info?.isLoggedIn) return true;

    if (this.sessionService.isLoggedIn) return true;

    return this.router.createUrlTree(["/login"]);
  }
}

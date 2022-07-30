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
    if (info?.isLoggedIn) {
      // this needs to be commented out to preserve the parameters passed in by other applications
      // this in turn leads to a need for a new login on page refresh - This is due to a bug in the inrupt library
      //      this.removeOICDQueryParams(state);
      return true;
    }

    if (this.sessionService.isLoggedIn) return true;

    return this.router.createUrlTree(["/login"], {
      queryParams: { target: state.url },
      queryParamsHandling: "merge",
    });
  }

  private removeOICDQueryParams(routerStateSnapshot: RouterStateSnapshot) {
    const url = new URL(routerStateSnapshot.url, location.origin);
    if (url.searchParams.has("code") || url.searchParams.has("state")) {
      this.router.navigate([url.pathname], {
        queryParamsHandling: "merge",
        queryParams: { code: null, state: null },
      });
    }
  }
}

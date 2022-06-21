import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "solid-app-verifiable-credentials-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "rki";

  queryParamMap$ = this.activatedRoute.queryParamMap;

  constructor(private activatedRoute: ActivatedRoute) {}

  redirectBack() {
    this.queryParamMap$.subscribe((queryParamMap) => {
      const redirectUrl = new URL(queryParamMap.get("redirectUri")!);

      redirectUrl.searchParams.append(
        "proofUri",
        "https://robert-koch.solidcommunity.net/proofs/4711#covid"
      );

      window.location.href = redirectUrl.toString();
    });
  }
}

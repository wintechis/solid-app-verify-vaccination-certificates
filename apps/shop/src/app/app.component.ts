import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";

@Component({
  selector: "solid-app-verifiable-credentials-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "shop";

  proofUri: Observable<string | null> = this.activatedRoute.queryParamMap.pipe(
    map((paramMap) => {
      return paramMap.get("proofUri");
    })
  );

  constructor(private activatedRoute: ActivatedRoute) {}

  redirect() {
    const webId = encodeURIComponent(
      "https://wiesnery.solidcommunity.net/profile/card#me"
    );
    const redirectUri = encodeURIComponent("http://localhost:4202");
    window.location.href = `http://localhost:4201/?webId=${webId}&redirectUri=${redirectUri}`;
  }
}

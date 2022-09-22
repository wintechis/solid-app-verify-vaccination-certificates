import { Component, OnInit } from "@angular/core";

@Component({
  selector: "solid-app-verifiable-credentials-request-access-component",
  templateUrl: "./request-access-component.component.html",
  styleUrls: ["./request-access-component.component.scss"],
})
export class RequestAccessComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  requestAccess() {
    const webId = encodeURIComponent("https://id.inrupt.com/robertkochinst");
    const redirectUri = encodeURIComponent(location.href);
    window.location.href = `http://localhost:4200/requestAccess?webId=${webId}&redirectUri=${redirectUri}`;
  }
}

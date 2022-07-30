import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "solid-app-verifiable-credentials-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  idpURL = "https://login.inrupt.com";

  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  login() {
    this.loginService.login(
      this.idpURL,
      this.activatedRoute.snapshot.queryParams["target"]
    );
  }
}

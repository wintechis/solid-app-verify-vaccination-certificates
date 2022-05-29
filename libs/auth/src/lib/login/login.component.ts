import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";

@Component({
  selector: "solid-app-verifiable-credentials-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  idpURL = "https://broker.pod.inrupt.com";

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  login() {
    this.loginService.login(this.idpURL);
  }
}

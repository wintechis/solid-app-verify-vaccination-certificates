import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "solid-app-verifiable-credentials-verification-stepper",
  templateUrl: "./verification-stepper.component.html",
  styleUrls: ["./verification-stepper.component.scss"],
})
export class VerificationStepperComponent implements OnInit {
  firstFormGroup = this.formBuilder.group({ firstName: "", lastName: "" });
  secondFormGroup = this.formBuilder.group({ phoneNumber: "", email: "" });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}

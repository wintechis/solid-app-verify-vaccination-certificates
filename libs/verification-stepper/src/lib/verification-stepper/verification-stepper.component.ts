import { Component, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "solid-app-verifiable-credentials-verification-stepper",
  templateUrl: "./verification-stepper.component.html",
  styleUrls: ["./verification-stepper.component.scss"],
})
export class VerificationStepperComponent {
  // @ts-ignore
  @ViewChild("stepper") stepper: MatStepper;

  secondFormGroup = this.formBuilder.group({ phoneNumber: "", email: "" });

  vaccinationsUri: Observable<string | null> = this.activatedRoute.data.pipe(
    map((data) => data["vaccinationsUri"])
  );

  get selectedStepIndex(): number {
    if (this.activatedRoute.snapshot.data["vaccinationsUri"] != null) {
      return 1;
    }
    return 0;
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}
}

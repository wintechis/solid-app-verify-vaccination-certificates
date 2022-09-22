import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, map, Observable } from "rxjs";
import { MatStepper } from "@angular/material/stepper";
import { ProofGeneratorService } from "./proof-generator.service";
import { SessionService } from "@solid-app-verifiable-credentials/auth";

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
  proofUri: string | null = null;

  get selectedStepIndex(): number {
    if (this.proofUri != null) {
      return 2;
    }
    if (this.activatedRoute.snapshot.data["vaccinationsUri"] != null) {
      return 1;
    }
    return 0;
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private proofGenerator: ProofGeneratorService,
    private sessionService: SessionService,
    private cdr: ChangeDetectorRef
  ) {}

  async generateProof() {
    this.proofUri = await this.proofGenerator.generateProof(
      this.activatedRoute.snapshot.data["vaccinationsUri"],
      "https://wiesnery.solidcommunity.net/profile/card#me" // TODO: remove hard coded value
    );
    setTimeout(() => {
      this.stepper.next();
    }, 1);
  }

  redirectToShop() {
    const queryParamMap = this.activatedRoute.snapshot.queryParamMap;
    const redirectUri = queryParamMap.get("redirectUri");
    window.location.href =
      redirectUri + "?proofUri=" + encodeURIComponent(this.proofUri!);
  }
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VerificationStepperComponent } from "./verification-stepper/verification-stepper.component";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [VerificationStepperComponent],
  exports: [VerificationStepperComponent],
})
export class VerificationStepperModule {}

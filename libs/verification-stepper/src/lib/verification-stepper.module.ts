import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VerificationStepperComponent } from "./verification-stepper/verification-stepper.component";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RequestAccessComponentComponent } from "./verification-stepper/request-access-component/request-access-component.component";
import { Route, RouterModule } from "@angular/router";
import { VaccinationUrlResolver } from "./verification-stepper/vaccination-url.resolver";

export const routes: Route[] = [
  {
    path: "",
    component: VerificationStepperComponent,
    resolve: { vaccinationsUri: VaccinationUrlResolver },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [VerificationStepperComponent, RequestAccessComponentComponent],
  exports: [VerificationStepperComponent],
})
export class VerificationStepperModule {}

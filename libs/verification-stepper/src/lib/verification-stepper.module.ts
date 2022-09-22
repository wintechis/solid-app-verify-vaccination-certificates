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
import { HttpClientModule } from "@angular/common/http";
import {
  AuthModule,
  SessionService,
} from "@solid-app-verifiable-credentials/auth";

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
    HttpClientModule,
    RouterModule.forChild(routes),
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    AuthModule,
  ],
  declarations: [VerificationStepperComponent, RequestAccessComponentComponent],
  exports: [VerificationStepperComponent],
})
export class VerificationStepperModule {}

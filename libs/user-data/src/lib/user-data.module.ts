import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDataComponent } from "./user-data/user-data.component";
import { Route, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { VaccinationState } from "./state/vaccination.state";
import { VaccineState } from "./state/vaccine.state";
import { AuthorizationModule } from "@solid-app-verifiable-credentials/authorization";

export const userDataRoutes: Route[] = [
  { path: "", component: UserDataComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userDataRoutes),
    FormsModule,
    NgxsModule.forFeature([VaccinationState, VaccineState]),
    AuthorizationModule,
  ],
  declarations: [UserDataComponent],
})
export class UserDataModule {}

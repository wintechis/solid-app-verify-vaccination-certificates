import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDataComponent } from "./user-data/user-data.component";
import { Route, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { VaccinationState } from "./state/vaccination.state";
import { VaccineState } from "./state/vaccine.state";
import { AuthorizationModule } from "@solid-app-verifiable-credentials/authorization";
import { GrantAccessComponent } from "./grant-access/grant-access.component";
import { GrantAccessStorer } from "./grant-access-storer.service";
import { GrantAccessLoader } from "./grant-access-loader.service";

export const userDataRoutes: Route[] = [
  {
    path: "",
    component: UserDataComponent,
    resolve: { resolve: GrantAccessStorer },
    children: [
      {
        path: "requestAccess",
        component: GrantAccessComponent,
        resolve: { grantAccessData: GrantAccessLoader },
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userDataRoutes),
    FormsModule,
    NgxsModule.forFeature([VaccinationState, VaccineState]),
    AuthorizationModule,
  ],
  declarations: [UserDataComponent, GrantAccessComponent],
})
export class UserDataModule {}

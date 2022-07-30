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
import { GrantAccessDialogComponent } from "./grant-access/grant-access-dialog/grant-access-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

export const userDataRoutes: Route[] = [
  {
    path: "",
    component: UserDataComponent,
    canActivate: [GrantAccessStorer],
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
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    UserDataComponent,
    GrantAccessComponent,
    GrantAccessDialogComponent,
  ],
  providers: [GrantAccessStorer, GrantAccessLoader],
})
export class UserDataModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, AuthModule } from "@solid-app-verifiable-credentials/auth";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("@solid-app-verifiable-credentials/user-data").then(
        (value) => value.UserDataModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true }), AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

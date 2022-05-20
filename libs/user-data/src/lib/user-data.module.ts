import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDataComponent } from "./user-data/user-data.component";
import { Route, RouterModule } from "@angular/router";

export const userDataRoutes: Route[] = [
  { path: "", component: UserDataComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(userDataRoutes)],
  declarations: [UserDataComponent],
})
export class UserDataModule {}

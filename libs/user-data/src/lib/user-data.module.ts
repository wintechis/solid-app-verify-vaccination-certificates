import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDataComponent } from "./user-data/user-data.component";
import { Route, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

export const userDataRoutes: Route[] = [
  { path: "", component: UserDataComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(userDataRoutes), FormsModule],
  declarations: [UserDataComponent],
})
export class UserDataModule {}

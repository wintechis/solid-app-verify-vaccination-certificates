import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { Route, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

export const authRoutes: Route[] = [
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authRoutes), FormsModule],
  declarations: [LoginComponent],
})
export class AuthModule {}

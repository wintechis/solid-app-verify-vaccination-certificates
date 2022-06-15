import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { Route, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SessionService } from "./session/session.service";

export const authRoutes: Route[] = [
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authRoutes), FormsModule],
  declarations: [LoginComponent],
  providers: [SessionService],
})
export class AuthModule {}

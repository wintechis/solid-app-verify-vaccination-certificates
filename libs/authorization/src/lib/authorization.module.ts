import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { AuthorizationState } from "./state/authorization.state";
import { AuthorizationService } from "./authorization.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxsModule.forFeature([AuthorizationState]),
  ],
  exports: [AuthorizationComponent],
  declarations: [AuthorizationComponent],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}

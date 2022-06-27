import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { VerificationStepperModule } from "@solid-app-verifiable-credentials/verification-stepper";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: "enabledBlocking" }),
    BrowserAnimationsModule,
    MatButtonModule,
    VerificationStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

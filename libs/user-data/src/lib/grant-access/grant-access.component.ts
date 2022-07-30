import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { GrantAccessDialogComponent } from "./grant-access-dialog/grant-access-dialog.component";
import { GrantAccessDialogModel } from "./grant-access-dialog/grant-access-dialog-model";
import { SessionService } from "@solid-app-verifiable-credentials/auth";

@Component({
  selector: "solid-app-verifiable-credentials-grant-access",
  templateUrl: "./grant-access.component.html",
  styleUrls: ["./grant-access.component.scss"],
})
export class GrantAccessComponent implements OnInit {
  webId: Observable<string> = this.activatedRoute.data.pipe(
    map((data) => data["grantAccessData"]["webId"])
  );

  redirectUri: Observable<string> = this.activatedRoute.data.pipe(
    map((data) => data["grantAccessData"]["redirectUri"])
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.matDialog
      .open<GrantAccessDialogComponent, GrantAccessDialogModel, boolean>(
        GrantAccessDialogComponent,
        {
          data: {
            webId: this.activatedRoute.snapshot.data["grantAccessData"].webId,
            redirectUri:
              this.activatedRoute.snapshot.data["grantAccessData"].redirectUri,
          },
        }
      )
      .afterClosed()
      .subscribe(async (accessGranted) => {
        if (accessGranted) {
          const url = new URL(
            this.activatedRoute.snapshot.data["grantAccessData"].redirectUri
          );
          url.searchParams.append(
            "vaccinationsUri",
            (await this.getVaccinationThingUrl()).toString()
          );
          window.location.href = url.toString();
        }
      });
  }

  private async getVaccinationThingUrl() {
    const url = await this.sessionService.storageRootUrl;
    url.pathname += "vaccinations";
    return url;
  }
}

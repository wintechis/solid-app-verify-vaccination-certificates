import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GrantAccessDialogModel } from "./grant-access-dialog-model";
import { AuthorizationService } from "../../../../../authorization/src/lib/authorization.service";

@Component({
  selector: "solid-app-verifiable-credentials-grant-access-dialog",
  templateUrl: "./grant-access-dialog.component.html",
  styleUrls: ["./grant-access-dialog.component.scss"],
})
export class GrantAccessDialogComponent implements OnInit {
  webId: string = this.data.webId;
  redirectUri: string = this.data.redirectUri;

  constructor(
    private matDialogRef: MatDialogRef<GrantAccessDialogModel, boolean>,
    @Inject(MAT_DIALOG_DATA) private data: GrantAccessDialogModel,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {}

  grantAccess() {
    this.authorizationService.setAgentReadAccess(this.webId).then((_) => {
      this.matDialogRef.close(true);
    });
  }
}

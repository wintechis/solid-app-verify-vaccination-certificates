import { Injectable } from "@angular/core";
import { SessionService } from "@solid-app-verifiable-credentials/auth";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(private sessionService: SessionService) {}

  async getWebId(): Promise<string | undefined> {
    return this.sessionService.session.info.webId;
  }
}

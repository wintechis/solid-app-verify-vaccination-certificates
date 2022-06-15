import { Injectable } from "@angular/core";
import { SessionService } from "@solid-app-verifiable-credentials/auth";

@Injectable()
export class AuthorizationService {
  constructor(private sessionService: SessionService) {}

  public async getAgentAccessAll() {
    return await this.sessionService.getAgentAccessAll(
      this.getVaccinationThingUrl().toString()
    );
  }

  private getVaccinationThingUrl() {
    const url = this.sessionService.storageRootUrl;
    url.pathname += "vaccinations";
    return url;
  }

  public async setAgentReadAccess(webId: string) {
    return this.sessionService.setAgentAccess(
      this.getVaccinationThingUrl().toString(),
      webId,
      { read: true }
    );
  }
}

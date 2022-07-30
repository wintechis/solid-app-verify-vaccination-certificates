import { Injectable } from "@angular/core";
import { SessionService } from "@solid-app-verifiable-credentials/auth";

@Injectable()
export class AuthorizationService {
  constructor(private sessionService: SessionService) {}

  public async getAgentAccessAll() {
    return await this.sessionService.getAgentAccessAll(
      (await this.getVaccinationThingUrl()).toString()
    );
  }

  private async getVaccinationThingUrl() {
    const url = await this.sessionService.storageRootUrl;
    url.pathname += "vaccinations";
    return url;
  }

  public async setAgentReadAccess(webId: string) {
    return this.sessionService.setAgentAccess(
      (await this.getVaccinationThingUrl()).toString(),
      webId,
      { read: true }
    );
  }
}

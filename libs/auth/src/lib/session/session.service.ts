import { Injectable } from "@angular/core";
import { ISessionInfo, Session } from "@inrupt/solid-client-authn-browser";
import {
  getPodUrlAll,
  getSolidDataset,
  saveSolidDatasetAt,
  SolidDataset,
  universalAccess,
} from "@inrupt/solid-client";
import { AccessModes } from "@inrupt/solid-client/dist/acp/type/AccessModes";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private _session = new Session();

  constructor() {}

  handleLoginRedirect(): Promise<ISessionInfo | undefined> {
    return this.session.handleIncomingRedirect({
      restorePreviousSession: true,
    });
  }

  get isLoggedIn(): boolean {
    return this.session.info.isLoggedIn;
  }

  get session(): Session {
    return this._session;
  }

  get storageRootUrl(): Promise<URL> {
    if (this.session.info.webId == undefined)
      throw new Error("webId is empty - please refresh the page and login");

    return getPodUrlAll(this.session.info.webId, {
      fetch: this.session.fetch,
    }).then((value) => new URL(value[0]));
  }

  getDataSet(url: string): Promise<SolidDataset> {
    // @ts-ignore
    return getSolidDataset(url, { fetch: this._session.fetch });
  }

  saveDataSet(url: string, dataSet: SolidDataset) {
    return saveSolidDatasetAt(url, dataSet, {
      // @ts-ignore
      fetch: this._session.fetch,
    });
  }

  getAgentAccessAll(url: string) {
    return universalAccess.getAgentAccessAll(url, {
      // @ts-ignore
      fetch: this._session.fetch,
    });
  }

  setAgentAccess(
    ressource: string,
    webId: string,
    access: Partial<AccessModes>
  ) {
    return universalAccess.setAgentAccess(ressource, webId, access, {
      // @ts-ignore
      fetch: this._session.fetch,
    });
  }
}

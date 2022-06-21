import { Injectable } from "@angular/core";
import { ISessionInfo, Session } from "@inrupt/solid-client-authn-browser";
import {
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

  get storageRootUrl(): URL {
    if (this.session.info.webId == undefined)
      throw new Error("webId is empty - please refresh the page and login");

    const url = new URL(this.session.info.webId);
    url.hash = "";
    url.pathname = url.pathname.substring(0, url.pathname.lastIndexOf("/")); // Walk path up
    url.pathname = url.pathname.substring(0, url.pathname.lastIndexOf("/")); // Walk path up
    if (!url.pathname.endsWith("/")) url.pathname += "/";

    return url;
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

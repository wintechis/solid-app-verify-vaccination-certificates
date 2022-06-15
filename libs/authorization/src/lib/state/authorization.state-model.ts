import { AccessModes } from "@inrupt/solid-client/dist/acp/type/AccessModes";

export interface AuthorizationStateModel {
  publicAccess: Partial<AccessModes>;
  agentAccess: { [webId: string]: Partial<AccessModes> };
}

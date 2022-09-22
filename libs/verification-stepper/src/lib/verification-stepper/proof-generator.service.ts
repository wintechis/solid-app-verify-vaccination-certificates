import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProofGenerationRequest } from "../../../../../apps/rki-proof-generation/src/app/proof-generation.request";
import { lastValueFrom } from "rxjs";
import { SessionService } from "@solid-app-verifiable-credentials/auth";
import { Session } from "@inrupt/solid-client-authn-browser";

@Injectable({
  providedIn: "root",
})
export class ProofGeneratorService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly sessionService: SessionService
  ) {}

  async generateProof(vaccinationsUri: string, webId: string): Promise<string> {
    const request: ProofGenerationRequest = {
      vaccinationsUri,
      webId,
    };
    const response = await lastValueFrom(
      this.httpClient.post("http://localhost:3333/api", request, {
        responseType: "text",
        observe: "response",
      })
    );

    return response.headers.get("Location") ?? response.body!;
    // Could be that CORS problems prevent the propagation of the Location header,
    // so we use the response body as a fallback
  }
}

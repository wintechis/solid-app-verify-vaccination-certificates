import { Body, Controller, Post } from "@nestjs/common";

import { AppService } from "./app.service";
import { ProofGenerationRequest } from "./proof-generation.request";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getData(@Body() proofGenerationRequest: ProofGenerationRequest) {
    return this.appService.generateProof(proofGenerationRequest);
  }
}

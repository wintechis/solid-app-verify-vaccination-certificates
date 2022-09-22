import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";

import { AppService } from "./app.service";
import { ProofGenerationRequest } from "./proof-generation.request";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getData(
    @Body() proofGenerationRequest: ProofGenerationRequest,
    @Res() res: Response
  ) {
    const proofUrl = await this.appService.generateProof(
      proofGenerationRequest
    );
    res.set("Location", proofUrl).status(201).send(proofUrl);
  }
}

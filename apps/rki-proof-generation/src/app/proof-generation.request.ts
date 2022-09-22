export class ProofGenerationRequest {
  constructor(
    public readonly vaccinationsUri: string,
    public readonly webId: string
  ) {}
}

import { TestBed } from "@angular/core/testing";

import { ProofGeneratorService } from "./proof-generator.service";

describe("ProofGeneratorService", () => {
  let service: ProofGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProofGeneratorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

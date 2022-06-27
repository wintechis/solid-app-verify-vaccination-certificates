import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VerificationStepperComponent } from "./verification-stepper.component";

describe("VerificationStepperComponent", () => {
  let component: VerificationStepperComponent;
  let fixture: ComponentFixture<VerificationStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

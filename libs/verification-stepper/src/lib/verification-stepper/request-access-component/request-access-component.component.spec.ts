import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RequestAccessComponentComponent } from "./request-access-component.component";

describe("RequestAccessComponentComponent", () => {
  let component: RequestAccessComponentComponent;
  let fixture: ComponentFixture<RequestAccessComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestAccessComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestAccessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

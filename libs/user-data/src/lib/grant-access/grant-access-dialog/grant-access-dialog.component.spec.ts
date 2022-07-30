import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GrantAccessDialogComponent } from "./grant-access-dialog.component";

describe("GrantAccessDialogComponent", () => {
  let component: GrantAccessDialogComponent;
  let fixture: ComponentFixture<GrantAccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrantAccessDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GrantAccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

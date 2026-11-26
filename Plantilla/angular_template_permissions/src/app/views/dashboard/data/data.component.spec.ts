import { componentTestProviders } from "src/testing/component-test-providers";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DataComponent } from "./data.component";

describe("DataComponent", () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataComponent],
      providers: componentTestProviders,
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

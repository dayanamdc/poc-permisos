import { componentTestProviders } from "src/testing/component-test-providers";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ComponentsComponent } from "./components.component";

describe("ComponentsComponent", () => {
  let component: ComponentsComponent;
  let fixture: ComponentFixture<ComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsComponent],
      providers: componentTestProviders,
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

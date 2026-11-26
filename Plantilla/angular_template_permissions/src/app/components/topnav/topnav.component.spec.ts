import { componentTestProviders } from "src/testing/component-test-providers";
import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { TopnavComponent } from "./topnav.component";

describe("TopnavComponent", () => {
  let component: TopnavComponent;
  let fixture: ComponentFixture<TopnavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TopnavComponent],
      providers: componentTestProviders,
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

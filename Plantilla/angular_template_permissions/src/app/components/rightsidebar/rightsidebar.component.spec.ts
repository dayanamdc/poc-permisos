import { componentTestProviders } from "src/testing/component-test-providers";
import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { RightSidebarComponent } from "./rightsidebar.component";

describe("RightSidebarComponent", () => {
  let component: RightSidebarComponent;
  let fixture: ComponentFixture<RightSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RightSidebarComponent],
      providers: componentTestProviders,
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

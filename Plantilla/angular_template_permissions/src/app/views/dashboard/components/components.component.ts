import { Component, Injector, ViewChild } from "@angular/core";
import { RightSidebarComponent } from "../../../components";
import { PageBaseComponent } from "../../base/page-base.component";
import { MatDivider } from "@angular/material/divider";
import { Bind } from "primeng/bind";
import { Button } from "primeng/button";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-components",
  templateUrl: "./components.component.html",
  styleUrls: ["./components.component.css"],
  imports: [
    MatDivider,
    Bind,
    Button,
    RightSidebarComponent,
    RouterLink,
    RouterOutlet,
    TranslatePipe,
  ],
})
export class ComponentsComponent extends PageBaseComponent {
  @ViewChild(RightSidebarComponent, { static: true })
  rightSideBarComponent: RightSidebarComponent;

  public dummyData: any;

  constructor(injector: Injector) {
    super(injector);
  }

  public showrightSidebar() {
    this.rightSideBarComponent.display = !this.rightSideBarComponent.display;
  }
}

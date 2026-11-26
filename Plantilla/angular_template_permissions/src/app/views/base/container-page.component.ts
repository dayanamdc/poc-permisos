import { Component, ViewChild, Injector } from "@angular/core";
import { SidebarComponent } from "../../components";
import { PageBaseComponent } from "./page-base.component";
import { NgClass } from "@angular/common";
import { TopnavComponent } from "../../components/topnav/topnav.component";
import { SidebarComponent as SidebarComponent_1 } from "../../components/sidebar/sidebar.component";

@Component({
  selector: "app-container-page",
  templateUrl: "./container-page.component.html",
  styleUrls: ["./container-page.component.scss"],
  imports: [NgClass, TopnavComponent, SidebarComponent_1],
})
export class ContainerPageComponent extends PageBaseComponent {
  @ViewChild(SidebarComponent, { static: false })
  sideBarComponent: SidebarComponent;
  expanded = true;
  pushRight = false;
  user: any;

  constructor(injector: Injector) {
    super(injector);
    this.user = this.authService.user;
  }

  expandSidebar() {
    this.sideBarComponent.expand();
    this.expanded = true;
    this.pushRight = !this.pushRight;
  }
  toogleExpandMainContainer() {
    this.expanded = !this.expanded;
  }
}

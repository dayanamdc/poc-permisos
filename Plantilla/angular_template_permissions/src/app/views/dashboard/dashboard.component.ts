import { Component, Injector } from "@angular/core";
import { ContainerPageComponent } from "../base/container-page.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  imports: [ContainerPageComponent, RouterOutlet],
})
export class DashboardComponent extends ContainerPageComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}

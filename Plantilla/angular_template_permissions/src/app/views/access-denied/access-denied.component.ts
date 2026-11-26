import { Component, Injector } from "@angular/core";
import { ContainerPageComponent } from "../base/container-page.component";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-access-denied",
  templateUrl: "./access-denied.component.html",
  styleUrls: ["./access-denied.component.scss"],
  imports: [ContainerPageComponent, MatIcon],
})
export class AccessDeniedComponent extends ContainerPageComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}

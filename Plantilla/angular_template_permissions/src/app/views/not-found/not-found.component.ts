import { Component, Injector } from "@angular/core";
import { ContainerPageComponent } from "../base/container-page.component";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
  imports: [ContainerPageComponent, MatIcon],
})
export class NotFoundComponent extends ContainerPageComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}

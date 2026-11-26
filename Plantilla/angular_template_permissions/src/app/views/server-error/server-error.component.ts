import { Component, Injector } from "@angular/core";
import { ContainerPageComponent } from "../base/container-page.component";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-server-error",
  templateUrl: "./server-error.component.html",
  styleUrls: ["./server-error.component.scss"],
  imports: [ContainerPageComponent, MatIcon],
})
export class ServerErrorComponent extends ContainerPageComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}

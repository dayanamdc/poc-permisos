import { Component, Injector } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Bind } from "primeng/bind";
import { Drawer } from "primeng/drawer";
import { Card } from "primeng/card";
import { PrimeTemplate } from "primeng/api";
import { Button } from "primeng/button";

@Component({
  selector: "app-rightsidebar",
  templateUrl: "./rightsidebar.component.html",
  styleUrls: ["./rightsidebar.component.scss"],
  imports: [Bind, Drawer, Card, PrimeTemplate, Button],
})
export class RightSidebarComponent extends BaseComponent {
  public display: boolean;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.display = false;
  }
}

import { Component } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-home",
  imports: [MatDivider, TranslatePipe],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}

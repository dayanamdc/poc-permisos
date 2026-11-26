import { Component } from "@angular/core";
import { environment } from "@environment";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  imports: [MatDivider],
})
export class AboutComponent {
  public title = environment.title;
  public version = environment.version;
  public build = environment.build;
}

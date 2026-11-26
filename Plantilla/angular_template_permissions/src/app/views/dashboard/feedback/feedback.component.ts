import { Component } from "@angular/core";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.scss"],
  imports: [MatDivider],
})
export class FeedbackComponent {
  constructor() {}
}

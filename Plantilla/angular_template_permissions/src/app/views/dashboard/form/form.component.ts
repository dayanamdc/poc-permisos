import { Component, OnInit } from "@angular/core";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
  imports: [MatDivider],
})
export class FormComponent implements OnInit {
  public cities: object[];
  public inputValue: string = "";

  public selectedCity: object;

  constructor() {
    this.cities = [];
  }

  ngOnInit(): void {
    this.cities = [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ];
  }
}

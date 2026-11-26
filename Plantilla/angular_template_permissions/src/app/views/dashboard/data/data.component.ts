import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "@environment";
import { Observable } from "rxjs";
import { MatDivider } from "@angular/material/divider";
import { NgxJsonViewerModule } from "ngx-json-viewer";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.css"],
  imports: [MatDivider, NgxJsonViewerModule],
})
export class DataComponent implements OnInit {
  public dummyData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData().subscribe((data) => {
      this.dummyData = data;
    });
  }

  getData(): Observable<any> {
    return this.http.get(environment.apiUrl + "/Samples");
  }
}

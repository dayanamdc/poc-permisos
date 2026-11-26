import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DataRoutingModule } from "./data-routing.module";
import { DataComponent } from "./data.component";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  imports: [
    CommonModule,
    DataRoutingModule,
    NgxJsonViewerModule,
    MatDividerModule,
    DataComponent,
  ],
})
export class DataModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AboutRoutingModule } from "./about-routing.module";
import { AboutComponent } from "./about.component";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  imports: [CommonModule, AboutRoutingModule, MatDividerModule, AboutComponent],
})
export class AboutModule {}

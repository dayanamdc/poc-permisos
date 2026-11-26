import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    DashboardComponent,
  ],
})
export class DashboardModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsRoutingModule } from "./components-routing.module";
import { ComponentsComponent } from "./components.component";
import { MatDividerModule } from "@angular/material/divider";
import { TranslatePipe } from "@ngx-translate/core";

import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatDividerModule,
    TranslatePipe,
    FormsModule,
    ButtonModule,
    ComponentsComponent,
  ],
})
export class ComponentsModule {}

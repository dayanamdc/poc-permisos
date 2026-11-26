import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormRoutingModule } from "./form-routing.module";
import { FormComponent } from "./form.component";
import { MatDividerModule } from "@angular/material/divider";
import { ListboxModule } from "primeng/listbox";

import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormRoutingModule,
    MatDividerModule,
    ListboxModule,
    FormsModule,
    FormComponent,
  ],
})
export class FormModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { NotFoundRoutingModule } from "./not-found-routing.module";
import { NotFoundComponent } from "./not-found.component";

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    MatIconModule,
    NotFoundComponent,
  ],
})
export class NotFoundModule {}

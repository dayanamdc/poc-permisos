import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerErrorRoutingModule } from "./server-error-routing.module";
import { ServerErrorComponent } from "./server-error.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    ServerErrorRoutingModule,
    MatIconModule,
    ServerErrorComponent,
  ],
})
export class ServerErrorModule {}

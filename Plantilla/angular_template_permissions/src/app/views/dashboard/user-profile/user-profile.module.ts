import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { UserProfileComponent } from "./user-profile.component";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    NgxJsonViewerModule,
    MatDividerModule,
    UserProfileComponent,
  ],
})
export class UserProfileModule {}

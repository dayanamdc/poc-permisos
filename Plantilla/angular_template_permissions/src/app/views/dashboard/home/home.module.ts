import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { LoggerService } from "../../../services/logger.service";
import { StorageMap } from "@ngx-pwa/local-storage";
import { HttpClientDataService } from "../../../services/data-services/http-client-data.service";
import { LocalStorageDataService } from "../../../services/data-services/local-storage-data.service";

import { MatDividerModule } from "@angular/material/divider";

import { ButtonModule } from "primeng/button";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    FormsModule,
    TranslatePipe,
    ReactiveFormsModule,
    NgxPermissionsModule.forChild(),
    ButtonModule,
    MatDividerModule,
    HomeComponent,
  ],
  providers: [
    {
      provide: HttpClientDataService,
      useClass: LocalStorageDataService,
      deps: [LoggerService, StorageMap],
    },
  ],
})
export class HomeModule {}

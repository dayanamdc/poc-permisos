import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AboutRoutingModule } from "./feedback-routing.module";
import { FeedbackComponent } from "./feedback.component";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatDividerModule,
    FeedbackComponent,
  ],
})
export class FeedbackModule {}

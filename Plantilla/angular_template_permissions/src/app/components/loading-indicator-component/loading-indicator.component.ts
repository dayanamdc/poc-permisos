import { Component, Input, Injector } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Observable } from "rxjs";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-loading-indicator",
  templateUrl: "./loading-indicator.component.html",
  styleUrls: ["./loading-indicator.component.scss"],
  imports: [MatProgressSpinner, AsyncPipe],
})
export class LoadingIndicatorComponent extends BaseComponent {
  @Input() size: string;
  @Input() loading$: Observable<boolean>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.size = this.size || "100px";
    this.loading$ = this.loading$ || new Observable<boolean>();
  }
}

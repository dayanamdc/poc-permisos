import { AsyncPipe } from "@angular/common";
import { ApplicationRef, Component, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from "@angular/router";
import { SwUpdate } from "@angular/service-worker";
import { MsalService } from "@azure/msal-angular";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { PrimeTemplate, MessageService } from "primeng/api";
import { Bind } from "primeng/bind";
import { Toast } from "primeng/toast";
import { filter, interval, switchMap, take } from "rxjs";

import { environment } from "@environment";
import { AuthService } from "./auth/auth.service";
import { LoadingIndicatorService } from "./services/loading-indicator.service";

@Component({
  selector: "app-root",
  imports: [
    AsyncPipe,
    RouterOutlet,
    Bind,
    Toast,
    PrimeTemplate,
    TranslatePipe,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly loadingIndicator = inject(LoadingIndicatorService);
  private readonly auth = inject(AuthService);
  private readonly msal = inject(MsalService);
  private readonly translate = inject(TranslateService);
  private readonly messages = inject(MessageService);
  private readonly appRef = inject(ApplicationRef);
  private readonly updates = inject(SwUpdate);

  readonly loading$ = this.loadingIndicator.loading$;

  constructor() {
    this.translate.use(environment.language);

    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (
        event instanceof NavigationStart ||
        event instanceof RouteConfigLoadStart
      ) {
        this.loadingIndicator.addLoading();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError ||
        event instanceof RouteConfigLoadEnd
      ) {
        this.loadingIndicator.removeLoading();
      }
    });

    if (this.updates.isEnabled) {
      this.appRef.isStable
        .pipe(
          filter(Boolean),
          take(1),
          switchMap(() => interval(60 * 60 * 1000)),
          takeUntilDestroyed(),
        )
        .subscribe(() => void this.updates.checkForUpdate());

      this.updates.versionUpdates
        .pipe(
          filter((event) => event.type === "VERSION_READY"),
          takeUntilDestroyed(),
        )
        .subscribe(() =>
          this.messages.add({
            key: "messageVersion",
            severity: "warn",
            detail: "New version available!",
            sticky: true,
            closable: false,
          }),
        );
    }
  }

  ngOnInit(): void {
    this.msal
      .handleRedirectObservable()
      .pipe(take(1))
      .subscribe({
        next: () => this.auth.checkAccount(),
        error: (error) =>
          console.error("Authentication redirect failed", error),
      });
  }

  refreshApp(): void {
    window.location.reload();
  }

  onClose(): void {
    this.messages.clear("messageDialog");
    this.messages.clear("messageVersion");
  }
}

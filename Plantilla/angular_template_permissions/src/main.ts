import { ErrorHandler, importProvidersFrom, isDevMode } from "@angular/core";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideRouterStore, RouterState } from "@ngrx/router-store";
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { providePrimeNG } from "primeng/config";
import Aura from "@primeuix/themes/aura";
import { MessageService } from "primeng/api";
import { DeviceDetectorService } from "ngx-device-detector";
import { LoggerModule } from "ngx-logger";
import { NgxPermissionsModule } from "ngx-permissions";

import { environment } from "@environment";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { AuthModule } from "./app/auth/auth.module";
import { reducers } from "./app/reducers/app.reducers";
import { metaReducers } from "./app/reducers/app-meta.reducers";
import { UncaughtExceptionHandler } from "./app/services/handlers/uncaught-exception.handler";
import { HttpErrorInterceptorModule } from "./app/interceptors/http-error-interceptor.module";
import { HttpRetryInterceptorModule } from "./app/interceptors/http-retry-interceptor.module";
import { HttpApiTokenInterceptorModule } from "./app/interceptors/http-api-token-interceptor.module";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideServiceWorker("ngsw-worker.js", { enabled: environment.production }),
    provideStore(reducers, { metaReducers }),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore({
      stateKey: "router",
      routerState: RouterState.Minimal,
    }),
    ...provideTranslateService({
      lang: environment.language,
      fallbackLang: environment.language,
    }),
    ...provideTranslateHttpLoader({
      prefix: "./assets/i18n/",
      suffix: ".json",
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          // Mantiene el tema claro aunque el sistema operativo prefiera modo oscuro.
          darkModeSelector: false,
        },
      },
    }),
    importProvidersFrom(
      LoggerModule.forRoot(environment.loggerConfig),
      AuthModule.forRoot(),
      NgxPermissionsModule.forRoot(),
      HttpErrorInterceptorModule.forRoot(),
      HttpRetryInterceptorModule.forRoot(),
      HttpApiTokenInterceptorModule.forRoot(),
    ),
    DeviceDetectorService,
    MessageService,
    { provide: ErrorHandler, useClass: UncaughtExceptionHandler },
  ],
}).catch((error: unknown) =>
  console.error("Application startup failed", error),
);

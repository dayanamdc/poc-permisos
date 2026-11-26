import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";
import { AuthService } from "../app/auth/auth.service";
import { provideTranslateService } from "@ngx-translate/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { NgxPermissionsService } from "ngx-permissions";
import { MessageService } from "primeng/api";
import { providePrimeNG } from "primeng/config";
import Aura from "@primeuix/themes/aura";

export const componentTestProviders = [
  provideRouter([]),
  provideHttpClient(),
  provideHttpClientTesting(),
  ...provideTranslateService({ lang: "en" }),
  providePrimeNG({ theme: { preset: Aura } }),
  MessageService,
  {
    provide: AuthService,
    useValue: { user: undefined, isAuthenticated: () => false },
  },
  { provide: DeviceDetectorService, useValue: { isMobile: () => false } },
  { provide: NgxPermissionsService, useValue: { getPermissions: () => ({}) } },
];

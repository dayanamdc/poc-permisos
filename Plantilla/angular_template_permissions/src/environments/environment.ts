// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --configuration=production` reemplaza este archivo por `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environment as defaultEnvironment } from "./environment.defaults";
import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  ...defaultEnvironment,
  msalConfig: {
    ...defaultEnvironment.msalConfig,
    clientId: "ac41a819-3f89-4518-adee-26a18078593b",
    authority: "https://login.microsoftonline.com/sgs.onmicrosoft.com",
    redirectUri: "https://localhost:4200",
    postLogoutRedirectUri: "https://localhost:4200",
    cacheLocation: "localStorage",
    consentScope: ["User.Read"],
    apiScope: ["api://ac41a819-3f89-4518-adee-26a18078593b/user_impersonation"],
    popUp: false,
  },
  apiUrl: "https://localhost:51469",
  apiVersion: "1.0",
  title: "Angular Starter Kit",
  appInsights: {
    instrumentationKey: "85182848-1ffc-4a85-b4be-4799ee00edc1",
  },
  loggerConfig: {
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.OFF,
  },
};

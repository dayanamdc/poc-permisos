// This file can be replaced during build by using the `fileReplacements` array.
// Configuracion para `ng build --configuration=lab`.
// The list of file replacements can be found in `angular.json`.

import { environment as defaultEnvironment } from "./environment.defaults";
import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  ...defaultEnvironment,
  production: true,
  msalConfig: {
    ...defaultEnvironment.msalConfig,
    clientId: "b42db156-bee1-46b9-9955-fc2a80b9d9dc",
    authority: "https://login.microsoftonline.com/sgs.onmicrosoft.com",
    redirectUri: "https://localhost:4200",
    postLogoutRedirectUri: "https://localhost:4200",
    cacheLocation: "localStorage",
    consentScope: ["User.Read"],
    apiScope: ["api://b42db156-bee1-46b9-9955-fc2a80b9d9dc/user_impersonation"],
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

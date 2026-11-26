// This file can be replaced during build by using the `fileReplacements` array.
// Configuracion para `ng build --configuration=production`.
// The list of file replacements can be found in `angular.json`.

import { environment as defaultEnvironment } from "./environment.defaults";
import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  ...defaultEnvironment,
  production: true,
  msalConfig: {
    ...defaultEnvironment.msalConfig,
    clientId: "db911c1d-eeb3-4d9d-ac59-0f07b0ef230f",
    authority: "https://login.microsoftonline.com/sgs.onmicrosoft.com",
    redirectUri: "https://sgsswacoengapp.sgs.com",
    postLogoutRedirectUri: "https://sgsswacoengapp.sgs.com",
    cacheLocation: "localStorage",
    consentScope: ["User.Read"],
    apiScope: ["api://2cc8c1b9-6fce-4513-86a7-9b22ebcd8665/user_impersonation"],
    popUp: false,
  },
  apiUrl: "https://apistarterkit.azurewebsites.net",
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

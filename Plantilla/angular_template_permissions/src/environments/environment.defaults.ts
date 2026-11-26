import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  lab: false,
  uat: false,
  production: false,
  loggerConfig: {
    level: NgxLoggerLevel.TRACE,
    serverLogLevel: NgxLoggerLevel.OFF,
  },
  msalConfig: {
    navigateToLoginRequestUrl: true,
    popUp: true,
    piiLoggingEnabled: true,
  },
  apiUrl: "",
  apiVersion: "",
  title: "APP TITLE",
  version: "1.0",
  build: "1",
  applicationId: "",
  language: "en",
};

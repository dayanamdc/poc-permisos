import { ModuleWithProviders, NgModule } from "@angular/core";
import { MsalGuard, MsalInterceptor, MsalModule } from "@azure/msal-angular";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { environment } from "@environment";
import {
  BrowserCacheLocation,
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser";

const localRedirectUri =
  window.location.hostname === "localhost"
    ? window.location.origin
    : environment.msalConfig.redirectUri;

const localPostLogoutRedirectUri =
  window.location.hostname === "localhost"
    ? window.location.origin
    : environment.msalConfig.postLogoutRedirectUri;

@NgModule({
  imports: [
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.msalConfig.clientId,
          authority: environment.msalConfig.authority,
          redirectUri: localRedirectUri,
          postLogoutRedirectUri: localPostLogoutRedirectUri,
          navigateToLoginRequestUrl:
            environment.msalConfig.navigateToLoginRequestUrl,
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
        },
        system: {
          loggerOptions: {
            piiLoggingEnabled: environment.msalConfig.piiLoggingEnabled,
            logLevel: LogLevel.Info,
            loggerCallback: (_logLevel, message) => {
              console.log("MSAL Logging: ", message);
            },
          },
        },
      }),
      {
        interactionType: environment.msalConfig.popUp
          ? InteractionType.Popup
          : InteractionType.Redirect,
      },
      {
        protectedResourceMap: new Map([
          [environment.apiUrl, [...environment.msalConfig.apiScope]],
        ]),
        interactionType: environment.msalConfig.popUp
          ? InteractionType.Popup
          : InteractionType.Redirect,
        authRequest: {
          redirectUri: localRedirectUri,
        },
      },
    ),
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        MsalGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MsalInterceptor,
          multi: true,
        },
      ],
    };
  }
}

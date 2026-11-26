import { inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
} from "@azure/msal-browser";
import { filter, take } from "rxjs";

import { environment } from "@environment";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly msal = inject(MsalService);
  private readonly broadcast = inject(MsalBroadcastService);
  private token?: string;

  // user?: AccountInfo;
  user?: AccountInfo = !environment.production
  ? ({
      name: "Usuario local",
      idTokenClaims: { roles: ["SampleAdd", "SampleEdit"] },
    } as AccountInfo)
  : undefined;
  /////////////////////////prueba

  constructor() {
    this.broadcast.inProgress$
      .pipe(
        filter((status) => status === InteractionStatus.None),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.checkAccount());

    this.broadcast.msalSubject$
      .pipe(
        filter((message) => message.eventType === EventType.LOGIN_SUCCESS),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.checkAccount());

    this.broadcast.msalSubject$
      .pipe(
        filter(
          (message) => message.eventType === EventType.ACQUIRE_TOKEN_SUCCESS,
        ),
        takeUntilDestroyed(),
      )
      .subscribe((message: EventMessage) => {
        this.token = (message.payload as AuthenticationResult).accessToken;
      });
  }

  checkAccount(): void {
  //   if (!environment.production) {
  //   return; // Conserva la cuenta simulada en serve:local.
  // }
    this.user =
      this.msal.instance.getActiveAccount() ??
      this.msal.instance.getAllAccounts()[0];

    if (this.user) {
      this.msal.instance.setActiveAccount(this.user);
    }
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  get accessToken(): string | undefined {
    return this.token;
  }

  login(): void {
    if (environment.msalConfig.popUp) {
      this.msal
        .loginPopup()
        .pipe(take(1))
        .subscribe({ next: () => this.checkAccount() });
    } else {
      this.msal.loginRedirect().pipe(take(1)).subscribe();
    }
  }

  logout(): void {
    this.msal.logoutRedirect().pipe(take(1)).subscribe();
  }
}

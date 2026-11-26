import { Directive, Injector } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Directive()
export class BaseComponent {
  protected router: Router;
  protected authService: AuthService;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.authService = injector.get(AuthService);
  }

  goToRoute(routes: Array<any>, extras?: NavigationExtras) {
    this.router.navigate(routes, extras);
  }

  windowWidth() {
    return window.innerWidth;
  }
}

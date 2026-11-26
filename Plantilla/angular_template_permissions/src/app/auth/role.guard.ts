import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { validateAuthorization } from "./validateAuthorization";

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data["rol"] as string | undefined;
  const roles = auth.user?.idTokenClaims?.roles;

  return auth.isAuthenticated() && validateAuthorization(roles, requiredRole)
    ? true
    : router.createUrlTree(["/access-denied"]);
};

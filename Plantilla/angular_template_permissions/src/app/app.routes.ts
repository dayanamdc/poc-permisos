import { Routes } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";

export const routes: Routes = [
  {
    path: "",
    canActivate: [MsalGuard],
    loadChildren: () =>
      import("./views/dashboard/dashboard.module").then(
        (m) => m.DashboardModule,
      ),
  },
  {
    path: "error",
    loadChildren: () =>
      import("./views/server-error/server-error.module").then(
        (m) => m.ServerErrorModule,
      ),
  },
  {
    path: "access-denied",
    loadChildren: () =>
      import("./views/access-denied/access-denied.module").then(
        (m) => m.AccessDeniedModule,
      ),
  },
  {
    path: "not-found",
    loadChildren: () =>
      import("./views/not-found/not-found.module").then(
        (m) => m.NotFoundModule,
      ),
  },
  { path: "**", redirectTo: "not-found" },
];

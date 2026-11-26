import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

import { roleGuard } from "../../auth/role.guard";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "components",
        loadChildren: () =>
          import("./components/components.module").then(
            (m) => m.ComponentsModule,
          ),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./form/form.module").then((m) => m.FormModule),
      },
      {
        path: "data",
        loadChildren: () =>
          import("./data/data.module").then((m) => m.DataModule),
      },
      {
        path: "feedback",
        loadChildren: () =>
          import("./feedback/feedback.module").then((m) => m.FeedbackModule),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./about/about.module").then((m) => m.AboutModule),
      },
      {
        path: "user-profile",
        loadChildren: () =>
          import("./user-profile/user-profile.module").then(
            (m) => m.UserProfileModule,
          ),
      },
      {
        path: "sample-add",
        loadChildren: () =>
          import("./about/about.module").then((m) => m.AboutModule),
        data: {
          rol: "SampleAdd",
        },
        canActivate: [roleGuard],
      },
      {
        path: "sample-edit",
        loadChildren: () =>
          import("./about/about.module").then((m) => m.AboutModule),
        data: {
          rol: "SampleEdit",
        },
        canActivate: [roleGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BandejaComponent } from './views/dashboard/bandeja/bandeja.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'bandeja',
        component: BandejaComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'bandeja',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'bandeja',
  },
];

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { InboxComponent } from './pages/inbox/inbox.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'bandeja',
        component: InboxComponent,
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

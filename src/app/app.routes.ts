import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { authGuard } from './guards/authguard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SuperAdminLoginComponent,
  },
  {
    path: 'navbar',
    loadComponent: () =>
      import('./components/navbar/navbar.component').then(
        (m) => m.NavbarComponent
      ),
    children: [
      {
        path: 'view-all-organizations',
        loadComponent: () =>
          import('./components/superadmin/superadmin.component').then(
            (m) => m.SuperadminComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },
];

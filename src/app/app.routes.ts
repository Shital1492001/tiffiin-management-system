import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { authGuard } from './guards/authguard.guard';

export const routes: Routes = [
  {
    path: '',
    component: SuperAdminLoginComponent,
  },
  {
    path: 'superAdminDashboard',
    loadComponent: () =>
      import('./components/superadmin/superadmin.component').then(
        (m) => m.SuperadminComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'statusDataTable',
    loadComponent: () =>
      import(
        './components/adminrequests/pending-admin-request/admin-request.component'
      ).then((m) => m.AdminRequestComponent),
    canActivate: [authGuard],
  },
];

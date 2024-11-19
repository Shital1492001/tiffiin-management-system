import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { authGuard } from './guards/authguard.guard';
import { AdminDashboardComponent } from './components/admin-approval-rights/admin-approval-rights.component';

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
    path: 'status',
    component: AdminDashboardComponent,
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

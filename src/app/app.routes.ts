import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { AuthGuard } from './guards/authguard.guard';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './components/admin-approval-rights/admin-approval-rights.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SuperAdminLoginComponent,
  },
  {
    path: 'admin-signup',
    component: AdminRegistrationComponent,
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
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: SuperadminDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statusDataTable',
    loadComponent: () =>
      import(
        './components/adminrequests/pending-admin-request/admin-request.component'
      ).then((m) => m.AdminRequestComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

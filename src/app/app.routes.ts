import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { authGuard } from './guards/authguard.guard';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';

export const routes: Routes = [
  {
    path: '',
    component: SuperAdminLoginComponent,
  },
  {
    path: 'superadmin-login',
    component: SuperAdminLoginComponent,
  },
  {
    path: 'admin-signup',
    component: AdminRegistrationComponent,
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
    path: 'add-organization',
    loadComponent: () =>
      import('./components/add-organization/add-organization.component').then(
        (m) => m.AddOrganizationComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'update-organization/:id',
    loadComponent: () =>
      import('./components/add-organization/add-organization.component').then(
        (m) => m.AddOrganizationComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'view-organization/:id',
    loadComponent: () =>
      import('./components/add-organization/add-organization.component').then(
        (m) => m.AddOrganizationComponent
      ),
    canActivate: [authGuard],
  },
];

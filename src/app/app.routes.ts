import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { authGuard } from './guards/authguard.guard';

export const routes: Routes = [
  {
    path: '',
    component: SuperAdminLoginComponent,
  },
  {
    path: 'superAdminDashboard/:id',
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
];

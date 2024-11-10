import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { authGuard } from './guards/authguard.guard';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
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
          import(
            './components/add-organization/add-organization.component'
          ).then((m) => m.AddOrganizationComponent),
        canActivate: [authGuard],
      },
      {
        path: 'update-organization/:id',
        loadComponent: () =>
          import(
            './components/add-organization/add-organization.component'
          ).then((m) => m.AddOrganizationComponent),
        canActivate: [authGuard],
      },
    ],
  },

];

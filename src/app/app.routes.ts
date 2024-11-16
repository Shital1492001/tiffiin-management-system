import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { AuthGuard } from './guards/authguard.guard';
import { AdminDashboardComponent } from './components/admin-approval-rights/admin-approval-rights.component';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
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
    path: 'status',
    component: AdminDashboardComponent,
  },

  {
    path: 'status',
    component: AdminDashboardComponent,
  },

  {
    path: 'admin-signup',
    component: AdminRegistrationComponent,
  },
  {
    path: 'navbar',
    loadComponent: () =>
      import('./components/navbar/navbar.component').then(
        (m) => m.NavbarComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import(
            './components/superadmin-dashboard/superadmin-dashboard.component'
          ).then((m) => m.SuperadminDashboardComponent),
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
        path: 'view-all-organizations',
        loadComponent: () =>
          import('./components/superadmin/superadmin.component').then(
            (m) => m.SuperadminComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'add-organization',
        loadComponent: () =>
          import(
            './components/add-organization/add-organization.component'
          ).then((m) => m.AddOrganizationComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'update-organization/:id',
        loadComponent: () =>
          import(
            './components/add-organization/add-organization.component'
          ).then((m) => m.AddOrganizationComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./components/admin-dashboard/admin-view/admin-view.component'
          ).then((m) => m.AdminViewComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'status',
        loadComponent: () =>
          import('./components/admin-approval-rights/admin-approval-rights.component'
          ).then((m) => m.AdminDashboardComponent),
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: 'view-organization/:id',
    loadComponent: () =>
      import('./components/add-organization/add-organization.component').then(
        (m) => m.AddOrganizationComponent
      ),
    canActivate: [AuthGuard],
  },
];

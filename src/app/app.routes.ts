import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { AuthGuard } from './guards/authguard.guard';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import(
            './components/superadmin-dashboard/superadmin-dashboard.component'
          ).then((m) => m.SuperadminDashboardComponent),
      },
      {
        path: 'statusDataTable',
        loadComponent: () =>
          import(
            './components/adminrequests/pending-admin-request/admin-request.component'
          ).then((m) => m.AdminRequestComponent),
      },
      {
        path: 'view-all-organizations',
        loadComponent: () =>
          import('./components/superadmin/superadmin.component').then(
            (m) => m.SuperadminComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import(
            './components/admin-dashboard/admin-view/admin-view.component'
          ).then((m) => m.AdminViewComponent),
      },
      {
        path: 'status',
        loadComponent: () =>
          import(
            './components/admin-approval-rights/admin-approval-rights.component'
          ).then((m) => m.AdminDashboardComponent),
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

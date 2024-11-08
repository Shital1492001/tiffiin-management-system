import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { authGuard } from './guards/authguard.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
    path:'login',
    loadComponent: () =>
      import('./components/super-admin-login/super-admin-login.component').then(
        (m) => m.SuperAdminLoginComponent
      ),
  }
];

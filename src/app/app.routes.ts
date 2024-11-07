import { Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './components/super-admin-login/super-admin-login.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { authGuard } from './guards/authguard.guard';

export const routes: Routes = [
  {
    path: '',
    component: SuperAdminLoginComponent,
    // loadComponent:()=>import("./components/super-admin-login/super-admin-login.component").then(m=>m.SuperAdminLoginComponent)
  },
  {
    path: 'superAdminDashboard',
    // component: SuperadminComponent,
    loadComponent: () =>
      import('./components/superadmin/superadmin.component').then(
        (m) => m.SuperadminComponent
      ),
    canActivate: [authGuard],
  },
];

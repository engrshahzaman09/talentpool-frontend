import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'hr',
    loadComponent: () =>
      import('./features/hr/hr-dashboard.component').then(m => m.HrDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_HR' }
  },
  {
    path: 'candidate',
    loadComponent: () =>
      import('./features/candidate/candidate-dashboard.component').then(m => m.CandidateDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_CANDIDATE' }
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
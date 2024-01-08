import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login')
        .then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register')
        .then((c) => c.RegisterComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full",
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: "full",
  },
];

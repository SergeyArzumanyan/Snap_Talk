import { Routes } from '@angular/router';

import { authGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'auth',
        loadComponent: () =>
          import('@pages/auth')
            .then((c) => c.AuthComponent),
        loadChildren: () => 
          import('@pages/auth')
            .then((r) => r.AUTH_ROUTES),
      },
      {
        path: '',
        loadComponent: () =>
          import('@pages/layout')
            .then((c) => c.LayoutComponent),
        loadChildren: () =>
          import('@pages/layout')
            .then((r) => r.LAYOUT_ROUTES),
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: "full"
      }
    ]
  }
];

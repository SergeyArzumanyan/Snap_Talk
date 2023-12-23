import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@pages/layout/layout.component')
        .then((c) => c.LayoutComponent),
    loadChildren: () =>
      import('@pages/layout/layout.routes')
        .then((r) => r.LAYOUT_ROUTES),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@pages/auth/auth.component')
        .then((c) => c.AuthComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: "full"
  }
];

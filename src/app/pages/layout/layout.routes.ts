import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./containers/menu/pages/profile/profile.component').then((c) => c.ProfileComponent),
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('./containers/menu/pages/messages/messages.component')
        .then((c) => c.MessagesComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./containers/menu/pages/settings/settings.component')
        .then((c) => c.SettingsComponent),
  },
  {
    path: 'welcome',
    outlet: 'content',
    loadComponent: () =>
      import('./containers/content/pages/welcome/welcome.component')
        .then((c) => c.WelcomeComponent),
  },
  {
    path: 'messages-content',
    outlet: 'content',
    loadComponent: () =>
      import('./containers/content/pages/messages-content/messages-content.component')
        .then((c) => c.MessagesContentComponent),
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: "full",
  },
  {
    path: '**',
    redirectTo: 'profile',
    pathMatch: "full",
  },
  {
    path: '',
    outlet: 'content',
    redirectTo: 'welcome',
    pathMatch: "full",
  },
  {
    path: '**',
    outlet: 'content',
    redirectTo: 'welcome',
    pathMatch: "full",
  },
];

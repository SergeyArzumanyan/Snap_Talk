import { Routes } from '@angular/router';

function getOutlet(): string | undefined {
  return window.innerWidth > 768 ? 'content' : undefined;
}

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
    path: 'chat',
    outlet: getOutlet(),
    loadComponent: () =>
      import('./containers/content/pages/chat/chat.component')
        .then((c) => c.ChatComponent),
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
];

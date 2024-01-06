import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./containers/menu/pages/profile/profile.component').then((c) => c.ProfileComponent),
  },
  {
    path: 'chats',
    loadComponent: () =>
      import('@pages/layout/containers/menu/pages/chats/chats.component')
        .then((c) => c.ChatsComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./containers/menu/pages/settings/settings.component')
        .then((c) => c.SettingsComponent),
  },
  {
    path: 'chat',
    outlet: 'content',
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

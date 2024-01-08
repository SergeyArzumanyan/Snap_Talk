import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  {
    path: 'chats',
    loadComponent: () =>
      import('./containers/menu/pages/chats')
        .then((c) => c.ChatsComponent),
  },
  {
    path: 'settings',
    data: {
      isHeaderAbsolute: true
    },
    loadComponent: () =>
      import('./containers/menu/pages/settings')
        .then((c) => c.SettingsComponent),
  },
  {
    path: 'chat',
    outlet: 'content',
    loadComponent: () =>
      import('./containers/content/pages/chat')
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

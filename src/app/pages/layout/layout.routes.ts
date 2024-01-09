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
    path: 'chat/:id',
    outlet: 'content',
    loadComponent: () =>
      import('./containers/content/pages/chat')
        .then((c) => c.ChatComponent),
  },
  {
    path: '',
    redirectTo: 'chats',
    pathMatch: "full",
  },
  {
    path: '**',
    redirectTo: 'chats',
    pathMatch: "full",
  },
];

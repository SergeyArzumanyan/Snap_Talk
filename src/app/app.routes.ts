import { Routes } from '@angular/router';

import { UsersComponent } from "@app/pages";

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: "full"
  }
];

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '..';

export const authGuard: CanActivateFn = (route) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return new Observable((obs) => {
    if (router.getCurrentNavigation()?.id > 1) {
      obs.next(true);
    } else {
      authService.verifyUser().subscribe({
        next: (data) => {
          authService.userData$.next(data);
          authService.isAuthenticated$.next(true);

          if (route.firstChild.routeConfig.path === 'auth') {
            obs.next(router.createUrlTree(['chats']));
          } else {
            obs.next(true);
          }
        },
        error: () => {
          authService.userData$.next(null);
          authService.isAuthenticated$.next(false);

          if (route.firstChild.routeConfig.path !== 'auth') {
            obs.next(router.createUrlTree(['auth']));
          } else {
            obs.next(true);
          }
        },
      });
    }
  });
};

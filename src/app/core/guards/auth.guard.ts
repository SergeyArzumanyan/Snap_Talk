import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, ConfigService, UsersService } from '..';
import { take } from "rxjs/operators";

export const authGuard: CanActivateFn = (route) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const configService: ConfigService = inject(ConfigService);
  const usersService: UsersService = inject(UsersService);

  return new Observable((obs) => {
    if (router.getCurrentNavigation()?.id > 1) {
      obs.next(true);
    } else {
      authService.verifyUser()
        .pipe(take(1))
        .subscribe({
          next: (user): void => {
            if (route.firstChild.routeConfig.path === 'auth') {
              obs.next(router.createUrlTree(['chats']));
            } else {
              obs.next(true);
            }

            authService.userData$.next(user);
            authService.isAuthenticated$.next(true);

            const { Theme, ThemeColor } = user.AppearanceSettings;
            configService.applyUserThemeSettings(Theme, ThemeColor);

            configService.subscribeToUserDataChanges(user);
            usersService.changeStatus(true);
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

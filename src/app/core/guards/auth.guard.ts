import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route) => {
  if (route.routeConfig.path === 'auth') {
    return localStorage.getItem('isAuthenticated')
      ? !inject(Router).navigate(['/'])
      : true;
  } else {
    return localStorage.getItem('isAuthenticated')
      ? true
      : !inject(Router).navigate(['/auth']);
  }
}
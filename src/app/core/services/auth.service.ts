import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ILoginData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userData$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private router: Router) {}

  public login(loginData: ILoginData): void {
    localStorage.setItem('isAuthenticated', 'true');
    this.isAuthenticated$.next(true);
    this.router.navigate(['/']);
  }

  public logout(): void {
    localStorage.removeItem('isAuthenticated');
    this.isAuthenticated$.next(false);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Methods } from '@app/methods';
import { HttpService } from './http.service';
import { ILoginData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userData$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpService) {}

  public verifyUser(): Observable<any> {
    return this.http.request(
      'get',
      Methods.VERIFY_USER,
    );
  }

  public login(loginData: ILoginData): Observable<any> {
    return this.http.request(
      'post',
      Methods.LOGIN,
      loginData,
    );
  }

  public logout(): void {
    this.userData$.next(null);
    this.isAuthenticated$.next(false);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

import { AuthService, HttpService } from "@app/core";
import { Methods } from "@app/methods";

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    private authService: AuthService,
    private http: HttpService,
  ) {}

  public getAllUsers(): Observable<any> {
    return this.http.request<any>(
      'get',
      Methods.GET_ALL_USERS,
      null,
      true,
      { params: { UserId: this.authService.userData$.getValue().Id } }
    );
  }

  public getFilteredUsers(UserId: number, SearchString: string): Observable<any> {
    return this.http.request<any>(
      'get',
      Methods.GET_FILTERED_USERS,
      null,
      true,
      { params: { UserId, SearchString } }
    );
  }

  public changeStatus(status: boolean): void {
    if (this.authService.userData$?.getValue()?.Id) {
      this.http.request<any>(
        'patch',
        `${Methods.USERS}${this.authService.userData$.getValue().Id}/change-status`,
        null,
        true,
        { params: { status } }
      )
        .pipe(take(1))
        .subscribe({
          next: (isOnline): void => {
            this.authService.userData$.next(
              {
                ...this.authService.userData$.getValue(),
                ...isOnline
              }
            );
          },
          error: (err): void => {
            console.group('HTTP Error')
            console.log('Something Went Wrong In \'changeStatus\'');
            console.log(err);
            console.groupEnd();
          }
        });
    }
  }
}

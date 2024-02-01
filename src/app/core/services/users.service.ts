import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { HttpService } from "@app/core";
import { Methods } from "@app/methods";

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpService) {}

  public getFilteredUsers(UserId: number, SearchString: string): Observable<any> {
    return this.http.request<any>(
      'get',
      Methods.GET_FILTERED_USERS,
      null,
      true,
      { params: { UserId, SearchString } }
    );
  }
}

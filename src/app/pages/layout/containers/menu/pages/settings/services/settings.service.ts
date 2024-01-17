import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Methods } from "@app/methods";
import { HttpService } from "@app/core";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private http: HttpService) {}

  public editUser(Id: number, payload: any): Observable<any> {
    return this.http.request<any>(
      'patch',
      Methods.USERS + Id,
      payload
    );
  }

  public saveAppearanceSettings(Id: number, payload: any): Observable<any> {
    return this.http.request<any>(
      'patch',
      Methods.SAVE_USER_APPEARANCE_SETTINGS + Id,
      payload
    )
  }
}

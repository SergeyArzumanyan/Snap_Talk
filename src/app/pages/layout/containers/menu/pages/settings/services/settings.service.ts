import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Methods } from "@app/methods";
import { AuthService, HttpService } from "@app/core";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(
    private http: HttpService,
    private authService: AuthService,
  ) {}

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

  public editUserImage(image: File, userImageProperty: string) :Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('userImageProperty', userImageProperty)

    return this.http.request(
      'post',
      Methods.USERS_SETTINGS + `${this.authService.userData$.getValue().Id}/userImage`,
      formData,
    );
  }

  public getFileFromObjectUrl(fileName: string, objectUrl: string): Promise<File | null> {
    return fetch(objectUrl)
      .then(croppedImage => croppedImage.blob())
      .then((croppedImageFile: Blob) => {
        return new File([croppedImageFile], fileName, { type: croppedImageFile.type });
      })
      .catch(() => null);
  }
}

import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Observable, take } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private http: HttpClient) {}

  public uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .post(
        environment.ImagesUrl + 'upload',
        formData
      )
      .pipe(take(1))
  }
}

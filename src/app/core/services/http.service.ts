import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    ) {}

  /**
   * @desc Function that dynamically creates headers for http request.
   * @param {*} body - the body of the request. If none was provided - there is no need to create headers for body.
   */
  private getHeaders(body: any = null): HttpHeaders {

    const headersObj: any = {};

    if (body && !(body instanceof FormData)) {
      // @ts-ignore
      headersObj['Content-Type'] = 'application/json';
    } else {
      if (body && body.files) {
        // @ts-ignore
        headersObj['Content-Type'] = 'multipart/form-data';
      }
    }

    return new HttpHeaders(headersObj);

  }


  /**
   * @desc Function that dynamically creates a request, using given parameters.
   * @param {string} type - the type of request, can be any of http requests - i.e. 'post'
   * @param {string} url - the URL endpoint of the request.
   * @param {object | null} [body=null] - the body of the request.
   * @param {boolean} [useParams] - Represents whether you should be used cookies for auth.
   * @param {object} [reqOptions] - Optional parameter, which is used for adding some extra options for
   * request. I.e. - response type.
   * @param {boolean} [addQuery]
   * @returns {Observable<any>} - observable containing request.
   */

  public request<T>(
    type: 'post' | 'get' | 'patch' | 'put' | 'delete',
    url: string,
    body: object | null = null,
    useParams?: boolean,
    reqOptions?: object,
    addQuery?: boolean
  ): Observable<T> {

    /** @desc endpoint */
    const to = url;

    /** @desc Creating an object which contains all request options. */
    let options: any = {
      // observe: 'response',
      headers: this.getHeaders(body),
    };

    /** @desc Creating an array, which contains all the arguments for the HttpClient request. */
    const argsArray: any[] = [to];

    /** @desc If we should be authenticated, append to options the option - WithCredentials. */
    if ( useParams ) {
      options.withCredentials = true;
    }

    /** @desc If we have extra request options */
    if ( reqOptions ) {
      options = {...options, ...reqOptions};
    }

    /** @desc Adds TimeZone and Language in Query based on boolean */
    if (addQuery) {
      const user = JSON.parse(this.cookieService.get('user'));
      if (user) {
        const queryParams = {
          TimeZone: user.TimeZone,
          LanguageId: user.LanguageId
        };
        if (options.params) {
          options.params = {...options.params, ...queryParams};
        } else {
          options.params = queryParams;
        }
      }
    }

    /** @desc Check if the request is 'get' or 'delete'
     * If so - we don't need to create headers.
     * if not - we should create headers.
     */
    if ( type === 'get' || type === 'delete' ) {
      argsArray.push(options);
    } else {
      let data = null;
      if (body) {
        /** @desc Check if body is instance of angular FormData. if not - we should it convert to JSON format.*/
        data = body;
      }

      /** @desc Push data into ArgsArray. */
      argsArray.push(data);
    }

    /** @desc Push all options into ArgsArray. */
    argsArray.push(options);

    // @ts-ignore
    return this.http[type](...argsArray);
  }
}

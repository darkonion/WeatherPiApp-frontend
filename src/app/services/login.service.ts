import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private rootUrl = `${environment.rootURI}`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  tryLogin(username: string, password: string): Observable<HttpResponse<any>> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.httpClient.post(this.rootUrl + '/login',
      body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }), withCredentials: true, observe: 'response'
    }).pipe(
      catchError((err) => {
        console.log(err);
        return of(err);
      }));
  }

  checkRole(): Observable<boolean> {
    return this.httpClient.get<boolean>(this.rootUrl + '/admin-check', { withCredentials: true })
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(err);
        }));
  }

  logout(): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.rootUrl + '/logout', null, { withCredentials: true })
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(err);
        }));
  }
}

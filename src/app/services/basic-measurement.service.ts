import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {BasicMeasurement} from "../models/basic-measurement";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BasicMeasurementService {

  private baseUrl = `${environment.baseURI}`;
  private token = `${environment.token}`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  getBasicMeasurement(): Observable<BasicMeasurement> {
    return this.httpClient.get<BasicMeasurement>(this.baseUrl + '/basic',  { headers:
        new HttpHeaders().set('Authorization', this.token),
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
      }));
  }

  getBasicMeasurementList(period: string): Observable<BasicMeasurement[]> {
    return this.httpClient.get<BasicMeasurement[]>(this.baseUrl + '/basic-full' + period, { headers:
        new HttpHeaders().set('Authorization', this.token),
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }));
  }
}

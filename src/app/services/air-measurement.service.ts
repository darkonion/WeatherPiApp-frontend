import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {AirMeasurement} from "../models/air-measurement";
import {BasicMeasurement} from "../models/basic-measurement";

@Injectable({
  providedIn: 'root'
})
export class AirMeasurementService {

  private baseUrl = `${environment.baseURI}`;
  private token = `${environment.token}`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  getAirMeasurement(): Observable<AirMeasurement> {
    return this.httpClient.get<AirMeasurement>(this.baseUrl + '/air',  { headers:
        new HttpHeaders().set('Authorization', this.token),
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }))
  }

  getAirMeasurementList(): Observable<AirMeasurement[]> {
    return this.httpClient.get<AirMeasurement[]>(this.baseUrl + '/air-full', { headers:
        new HttpHeaders().set('Authorization', this.token),
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }))
  }
}

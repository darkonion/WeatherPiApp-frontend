import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {AirMeasurement} from "../models/air-measurement";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private baseUrl = `${environment.statisticsURI}`;
  private token = `${environment.token}`;

  constructor(private httpClient: HttpClient, private router: Router) {  }

  getLatestDaily(): Observable<AirMeasurement> {
    return this.httpClient.get<AirMeasurement>(this.baseUrl + '/air/daily-latest',  { headers:
        new HttpHeaders().set('Authorization', this.token),
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }));
  }

  getLatestMonthly(): Observable<AirMeasurement> {
    return this.httpClient.get<AirMeasurement>(this.baseUrl + '/air/monthly-latest',  { headers:
        new HttpHeaders().set('Authorization', this.token),
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }));
  }

  getDailyList(period: string): Observable<AirMeasurement[]> {
    return this.httpClient.get<AirMeasurement[]>(this.baseUrl + '/air/daily' + period, { headers:
        new HttpHeaders().set('Authorization', this.token),
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }));
  }

  getMonthlyList(period: string): Observable<AirMeasurement[]> {
    return this.httpClient.get<AirMeasurement[]>(this.baseUrl + '/air/monthly' + period, { headers:
        new HttpHeaders().set('Authorization', this.token),
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }));
  }

  getAirMeasurementsCount(): Observable<number> {
    return this.httpClient.get<AirMeasurement[]>(this.baseUrl + '/air/count', { headers:
        new HttpHeaders().set('Authorization', this.token),
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }));
  }

  getBasicMeasurementsCount(): Observable<number> {
    return this.httpClient.get<AirMeasurement[]>(this.baseUrl + '/basic/count', { headers:
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

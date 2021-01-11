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
export class AirlyService {

  private baseUrl = `https://airapi.airly.eu/v2/measurements/point`;
  private apiKey = `${environment.airlyKey}`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  getCurrentMeasurements(lat: number, lng: number): Observable<GetResponseIngredients> {
    return this.httpClient.get<AirMeasurement>(this.baseUrl + '?lat=' + lat + '&lng=' + lng,
      { headers:
        new HttpHeaders({
          'apikey': this.apiKey,
          'Accept': 'application/json'
        })
    })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }));
  }
}

interface GetResponseIngredients {
  current: {
    values: [
      {name: string, value: number},
      {name: string, value: number},
      {name: string, value: number}
    ]
  }
}

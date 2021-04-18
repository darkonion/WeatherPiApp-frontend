import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {AirMeasurement} from "../models/air-measurement";
import {Lightning} from "../models/lightning";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LightningStrikesService {

  private baseUrl = `${environment.baseURI}`;
  private token = `${environment.token}`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  getLatestLightnings(): Observable<Lightning[]> {
    return this.httpClient.get<Lightning[]>(this.baseUrl + '/lightning', { headers:
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

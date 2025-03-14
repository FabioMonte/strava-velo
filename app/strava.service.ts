import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "./environment";
import {Observable} from "rxjs";
import {catchError, switchMap} from "rxjs";
import {StravaAuthService} from "./strava-auth.service";
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  constructor(private http: HttpClient, private authService: StravaAuthService) { }


  getAthlete(): Observable<any> {
    let token = localStorage.getItem('access_token');
    const expiresAt = parseInt(localStorage.getItem('expires_at') || '0', 10);
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime >= expiresAt) {
      const refreshToken = localStorage.getItem('refresh_token')?.toString();
      return this.authService.refreshToken(refreshToken).pipe(
        switchMap(response => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('expires_at', response.expires_at.toString());
          token = response.access_token;
          return this.http.get(`${environment.stravaApiUrl}/athlete`, {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
          });
        }),
        catchError(error => {
          console.error('Token refresh failed', error);
          return of(null);
        })
      );
    }

    return this.http.get(`${environment.stravaApiUrl}/athlete`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}

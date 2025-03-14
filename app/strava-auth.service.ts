import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "./environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StravaAuthService {
  private clientId = environment.stravaClientId;
  private clientSecret = environment.stravaClientSecret;
  private tokenUrl = 'https://www.strava.com/oauth/token';

  constructor(private http: HttpClient, private router: Router) { }

  loginWithStrava(): void {
    window.location.href = `${environment.stravaAuthUrl}?client_id=${environment.stravaClientId}&response_type=code&redirect_uri=${environment.stravaRedirectUri}&approval_prompt=force&scope=read,activity:read_all`;
  }

  exchangeToken(authCode: string): Observable<any> {
    console.log('Sending authCode to Strava:', authCode);

    const body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: authCode,
      grant_type: 'authorization_code'
    };

    return this.http.post(this.tokenUrl, body);
  }

  refreshToken(refreshToken: string | undefined): Observable<any> {
    return this.http.post(environment.stravaTokenUrl, {
      client_id: environment.stravaClientId,
      client_secret: environment.stravaClientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
  }

}

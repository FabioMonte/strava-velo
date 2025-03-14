import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StravaAuthService} from "../strava-auth.service";
@Component({
  selector: 'app-auth-callback',
  standalone: false,
  template: '<p>Authenticating with Strava...</p>',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stravaAuthService: StravaAuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const authCode = params['code'];
      if (authCode) {
        this.stravaAuthService.exchangeToken(authCode).subscribe(response => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          localStorage.setItem('expires_at', response.expires_at.toString());
          this.router.navigate(['/dashboard']);
        });
      }
    })
  }
}

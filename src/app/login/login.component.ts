import { Component } from '@angular/core';
import {StravaAuthService} from "../strava-auth.service";

@Component({
  selector: 'app-login',
  standalone: false,
  template: `<button (click)="login()">Login with Strava</button>`,
})
export class LoginComponent {
  constructor(private stravaAuthService: StravaAuthService) {
  }

  login(): void {
    this.stravaAuthService.loginWithStrava();
  }
}

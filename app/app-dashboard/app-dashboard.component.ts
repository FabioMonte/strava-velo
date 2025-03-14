import { Component } from '@angular/core';
import {StravaService} from "../strava.service";

@Component({
  selector: 'app-dashboard',
  standalone: false,
  template: `
    <div *ngIf="athlete">
      <h2>Welcome, {{ athlete.firstname }} {{ athlete.lastname }}</h2>
      <img [src]="athlete.profile" alt="Athlete Profile">
    </div>
  `
})
export class AppDashboardComponent {
  athlete: any;

  constructor(private stravaservice: StravaService) { }

  ngOnInit(): void {
    this.stravaservice.getAthlete().subscribe(data => {
      this.athlete = data;
    });
  }
}

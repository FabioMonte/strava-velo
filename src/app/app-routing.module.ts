import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthCallbackComponent} from "./auth-callback/auth-callback.component";
import {AppDashboardComponent} from "./app-dashboard/app-dashboard.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'auth/callback', component: AuthCallbackComponent},
  {path: 'dashboard', component: AppDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

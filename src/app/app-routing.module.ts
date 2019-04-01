import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }      from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
//import {routes} from 'app-routes';
const routes: Routes = [
  { path: '', component: HomeComponent }, 	
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }

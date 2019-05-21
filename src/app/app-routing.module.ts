import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }      from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductAddComponent } from './product-add/product-add.component';

import { AuthGuard } from './_guards';

//import {routes} from 'app-routes';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: HomeComponent },   
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'userMgmt', component: UserManagementComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'productAdd', component: ProductAddComponent }
];
@NgModule({
  imports: [  
    RouterModule.forRoot(routes)
  ],
  exports: [ 
  	RouterModule 
  ],
  declarations: []
})
export class AppRoutingModule { }

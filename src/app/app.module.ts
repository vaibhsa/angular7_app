import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './registration/registration.component';
import { AuthService } from './services/auth.services';
import { CartService } from './services/cart.services';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@NgModule({

  declarations: [
    AppComponent,    
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    RegistrationComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    NgbModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    AuthService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

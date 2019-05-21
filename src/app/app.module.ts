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
import { ProductService } from './services/product.services';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from "@angular/fire/auth"; 
import { environment } from '../environments/environment';
import { ProductAddComponent } from './product-add/product-add.component';

@NgModule({

  declarations: [
    AppComponent,    
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    RegistrationComponent,
    ShoppingCartComponent,
    UserManagementComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    NgbModule.forRoot(),
    NgxSpinnerModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)  
  ],
  providers: [
    AuthService,
    CartService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

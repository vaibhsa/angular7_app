import { NgZone } from '@angular/core';

import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import { map } from 'rxjs/operators';

import {

  FormBuilder,
  FormGroup,
  FormControl,
  Validators } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from 
       '@angular/router';

import { AngularFireAuth } from "@angular/fire/auth"; 
import * as firebase from "firebase"; 

declare var Auth0Lock;

@Injectable()

export class AuthService {
	
  constructor(
    private http: Http, 
    private ngZone: NgZone, 
    private router: Router, 
    private flash: FlashMessagesService,
    private afAuth: AngularFireAuth
  ) {}

  flag : boolean = false;

  getAuth() { 
    return this.afAuth.auth; 
  } 
  /** 
   * Initiate the password reset process for this user 
   * @param email email of the user 
   */ 
  resetPasswordInit(email: string) { 
  
    return this.afAuth.auth.sendPasswordResetEmail(
      email); 
  } 



  login(key: FormGroup) {
    
    var headers = new Headers();
    headers.append('content-Type','application/json');
    console.log("From Login() function.............");
    console.log(key.value.email);

    return this.http.post('https://angular7-shopping-cart.herokuapp.com/api/login', 
    // return this.http.post('http://localhost:3000/api/login', 
        key.value, {
          headers:headers
      }).pipe(map(res => res.json()))


  }

  logout() {
    
    var email = localStorage.getItem('email');

    let body=JSON.stringify({ 
        email: email
    });

    var headers = new Headers();
    headers.append('content-Type','application/json');

    return this.http.post('https://angular7-shopping-cart.herokuapp.com/api/logout', 
    // return this.http.post('http://localhost:3000/api/logout', 
        body, {
              headers:headers
           }).pipe(map(res => res.json()))
            .subscribe(
              data => {
                console.log(data);
                if(data.message =='success'){

                  localStorage.removeItem('email');
                  localStorage.removeItem('token');
                  this.flag = false;
                  this.loggedIn();
                  this.flash.show('LoggedOut successfully', { timeout: 3000,cssClass: 'alert-success' });
                  this.router.navigate(['/']);             
                }else{
                  
                  this.flash.show('Some problem with logout', { timeout: 3000,cssClass: 'alert-success' });
                }
            });
  }

  loggedIn() {

    if (localStorage.getItem('email')) {
      return true;
    }

    return false;
  }

  create(key: FormGroup) {

    // console.log(key.value);
    var headers = new Headers();
    headers.append('content-Type','application/json');
    // return this.http.post('http://localhost:3000/api/registration', 
    return this.http.post('https://angular7-shopping-cart.herokuapp.com/api/registration',   
      key.value, 
      {
        headers:headers
      }).pipe(map(res => res.json()));
  }

  resetPasswordMongo(email, password){

    let body=JSON.stringify({ 

        email: email,
        password: password
    });

    var headers = new Headers();
    headers.append('content-Type','application/json');
    // return this.http.post('http://localhost:3000/api/reset-password', 
    return this.http.post('https://angular7-shopping-cart.herokuapp.com/api/reset-password',   
      body, 
      {
        headers:headers
      }).pipe(map(res => res.json()));  
  }

}
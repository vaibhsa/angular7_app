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

declare var Auth0Lock;

@Injectable()

export class AuthService {
	
  constructor(private http:Http, private ngZone: NgZone, private router: Router, 
              private flash:FlashMessagesService) {}

  flag : boolean = false;

  login(key: FormGroup) {
    
    // let body = JSON.stringify({ 
    //   email: email, 
    //   password: password
    // });


    var headers = new Headers();
    headers.append('content-Type','application/json');
    console.log("From Login() function.............");

    return this.http.post('https://angular2-vaibhsa.herokuapp.com/login', 
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

    return this.http.post('https://angular2-vaibhsa.herokuapp.com/logout', 
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

}
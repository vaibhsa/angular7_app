import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.services';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
  	email: FormControl;
  	password: FormControl;

  	constructor(
      private router: Router,
      private authenticationService: AuthService, 
      private builder: FormBuilder,
      private flash: FlashMessagesService
    ) {

    	this.createForm();
  	}

  	ngOnInit() {
  	}

  	createForm() {
	  	
	  	this.email = new FormControl('', [
      	  Validators.email,
      	  Validators.required,
	    ]);
	    this.password = new FormControl('', [

	      Validators.required,
	      Validators.minLength(5)
	      //Validators.maxLength(5)
	    ]);
	    this.loginForm = this.builder.group({

	      email: this.email,
	      password:this.password,
	    });
	}

	login(){
		
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm)
    .subscribe(
        data => {
          console.log(data);          
          if(data.success==true){
            localStorage.setItem('email', data.email);
            localStorage.setItem('token', data.token);
            this.router.navigate(['/']);
          }
          else{

            this.flash.show('Either Username or Password is Incorrect', { timeout: 3000,cssClass: 'alert-success' });
            this.router.navigate(['/login']);
          }
        },
        error => {
          
          console.log(error);
        }
    );    
	}
}

import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.services';

import { FlashMessagesService } from 'angular2-flash-messages';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
  	email: FormControl;
  	password: FormControl;
    returnUrl: string;

  	constructor(
      private router: Router,
      private authenticationService: AuthService, 
      private builder: FormBuilder,
      private flash: FlashMessagesService,
      private spinner: NgxSpinnerService,
      private route: ActivatedRoute
    ) {

    	this.createForm();
  	}

  	ngOnInit() {

 	   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  	createForm() {
	  	// redirect to home if already logged in
      if (this.authenticationService.loggedIn()) { 
        this.router.navigate(['/']);
      }

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

		this.spinner.show();
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm)
    .subscribe(
      data => {

        console.log(data);
        this.spinner.hide();          
        if(data.success == true){
          
          localStorage.setItem('email', data.email);
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          if(data.role == 1){
            this.router.navigate(['/dashboard']);
          }else{
            this.router.navigate([this.returnUrl]);
          }
        }
        else{
          this.spinner.hide();
          this.flash.show('Either Username or Password is Incorrect', { timeout: 3000,cssClass: 'alert-danger' });
          this.router.navigate(['/login']);
        }
      },
      error => {

        this.spinner.hide();
        console.log(error);
      });    
	}

  resetPassword(){

    if (!this.email.value) { 
      
      alert('Type in your email first'); 
    }
    this.authenticationService.resetPasswordInit(this.email.value) 
    .then(() => alert('A password reset link has been sent to your email address'), 
      (rejectionReason) => alert('hello'+rejectionReason)) 
    .catch(e => alert('An error occurred while attempting to reset your password'));

  }

}

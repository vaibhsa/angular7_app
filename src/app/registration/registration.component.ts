import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helper/must-match.validator';

import { AuthService } from '../services/auth.services';

import { Router, ActivatedRoute } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	
	registerForm: FormGroup;
  	email: FormControl;
  	username: FormControl;
  	password: FormControl;	
  	cPassword: FormControl;

	constructor(
		private builder: FormBuilder, 
		private authenticationService: AuthService,
		private router: Router,
		private flash: FlashMessagesService
	) {

		this.createForm();
	}

	ngOnInit() {

	}

	register() {
      this.authenticationService.create(this.registerForm)
      .subscribe(
		data => {
		  if(data.message == "success"){
		    console.log(data.message);
		    localStorage.setItem('email',data.email);
		    localStorage.setItem('token',data.token);
		    this.router.navigate(['/']);
		  }else{
		    this.flash.show(data.email+' Email already exist', { timeout: 3000,cssClass: 'alert-success' });
		    this.router.navigate(['/register']); 
		  }
		},
		error => {
			console.log(error);
		});
  	}

	createForm(){
	  	
	  	this.email = new FormControl('', [

  	    	Validators.email,
        	Validators.required,
	    ]);
	    this.password = new FormControl('', [

	        Validators.required,
	        Validators.minLength(5)
	    ]);
	    this.cPassword = new FormControl('', [

	    	Validators.required,
	    	Validators.minLength(5),	      
	    ]);
	    this.username = new FormControl('', [

	    	Validators.required,
	    	Validators.minLength(5)
	    ]);

	    this.registerForm = this.builder.group({

		    email: this.email,
		    username: this.username,
		    password: this.password,
		    cPassword: this.cPassword
	    },{
	    	//validator: MustMatch('password', 'confirmPassword')
	    	validator: MustMatch(this.password, this.cPassword)
	    });
	}

}

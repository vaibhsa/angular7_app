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

import { AngularFireAuth } from "@angular/fire/auth";

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
		private flash: FlashMessagesService,
		private afAuth: AngularFireAuth
	) {

		this.createForm();
	}

	ngOnInit() {

	}

	onFileChange(event) {

		// console.log(event.target.files);
		if (event.target.files.length > 0) {
		
		  const file = event.target.files[0];
		  this.registerForm.get('profile').setValue(file);
		}
	}

	onSubmit() {



	}

	register() {

		const formData = new FormData();

		// console.log(this.registerForm.get('profile').value);

		formData.append('profile', this.registerForm.get('profile').value);
		formData.append('email', this.registerForm.value.email);
		formData.append('username', this.registerForm.value.username);
		formData.append('password', this.registerForm.value.password);

		// console.log(this.registerForm.value.email);	

	    this.authenticationService.create(this.registerForm)
	    .subscribe(
			data => {
			  if(data.message == "success"){
			    console.log(data.message);
			    this.afAuth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password);
				
				// this.afAuth.auth.currentUser.sendEmailVerificationCode();		    
			    localStorage.setItem('email',data.email);
			    localStorage.setItem('token',data.token);
			    this.router.navigate(['/']);
			  }else{
			    this.flash.show(data.email+' Email already exist', { timeout: 3000,cssClass: 'alert-success' });
			    this.registerForm.reset();
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
		    cPassword: this.cPassword,
		    profile: ['']
	    },{
	    	//validator: MustMatch('password', 'confirmPassword')
	    	validator: MustMatch(this.password, this.cPassword)
	    });
	}

}

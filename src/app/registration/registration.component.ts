import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helper/must-match.validator';

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

	constructor(private builder: FormBuilder) { 
		this.createForm();
	}

	ngOnInit() {

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

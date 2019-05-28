import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

	ngUnsubscribe: Subject<any> = new Subject<any>();

	// actions = UserManagementActions;
	// The user management actoin to be completed
	
	mode: string;
	// Just a code Firebase uses to prove that
	// this is a real password reset.
	actionCode: string;

	email: string;
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;

	actionCodeChecked: boolean;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private authService: AuthService
	) { }

	ngOnInit() {

	   this.activatedRoute.queryParams
	   .pipe(takeUntil(this.ngUnsubscribe))
	   .subscribe(params => {
	    // if we didn't receive any parameters, 
	    // we can't do anything
	    if (!params) this.router.navigate(['/']);

	    this.mode = params['mode'];
	    this.actionCode = params['oobCode'];

	    switch (params['mode']) {
	      case 'resetPassword': {
	        // Verify the password reset code is valid.
	        this.authService
	        .getAuth()
	        .verifyPasswordResetCode(this.actionCode)
	        .then(email => {
	          this.email = email;	
	          this.actionCodeChecked = true;
	        }).catch(e => {
	          // Invalid or expired action code. Ask user to try to
	          // reset the password again.
	          alert(e);
	          this.router.navigate(['/login']);
	        });
	        break;
	      } 
	      case 'recoverEmail': {
	      	break;
	      } 
	      case 'verifyEmail': {
	      	break;
	      } 
	      default: {
	        console.log('query parameters are missing');
	        this.router.navigate(['/login']);
	      }
	    }
	  })
	}

	ngOnDestroy() {
		// End all subscriptions listening to ngUnsubscribe
		// to avoid memory leaks.
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	/**
	* Attempt to confirm the password reset with firebase and
	* navigate user back to home.
	*/
	handleResetPassword() {

		console.log(this.newPassword);
		if (this.newPassword != this.confirmPassword) {
		  alert('New Password and Confirm Password do not match');
		  return;
		}

		this.authService.resetPasswordMongo(this.email, this.newPassword)
		.subscribe(
			data => {
			  if(data.message == "success"){
			    console.log(data); 
			  }
			},
			error => {
				console.log(error);
		});

		// Save the new password.
		this.authService.getAuth().confirmPasswordReset(
		    this.actionCode,   
		    this.newPassword
		)
		.then(resp => {
		  // Password reset has been confirmed and new password updated.
		  alert('New password has been saved');
		  this.router.navigate(['/login']);
		}).catch(e => {
		  // Error occurred during confirmation. The code might have
		  // expired or the password is too weak.
		  alert(e);
		});
	}

}

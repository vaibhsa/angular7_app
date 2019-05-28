import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } 
    from '@angular/router';

import { AuthService } from '../services/auth.services';

@Injectable({ providedIn: 'root' })
export class AuthGuardAdmin implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const adminUser = this.authenticationService.role();
        if (adminUser) {
            // authorised so return true
            return true;
        }

        alert('Login as admin to see this page');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/']);
        return false;
    }
}
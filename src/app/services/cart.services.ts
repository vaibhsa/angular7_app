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

export class CartService {
	
  constructor(
    private http:Http, 
    private ngZone: NgZone, 
    private router: Router, 
    private flash:FlashMessagesService) {}

  flag : boolean = false;

  productCart: Array<{_id: number, title: string, description: string, price: number, imagePath: string, qty: number}> = [];

  cartQTY() {

    // if(window.location.reload()){
    //     console.log("reloaded");
    // }
    if (localStorage.getItem('qty')) {
    
      var qtyP = localStorage.getItem('qty');
      return qtyP;
    }

    return 0;
  }

  clearCart(){

    localStorage.removeItem("qty");
    localStorage.removeItem("products");
    this.router.navigate(['/']);
  }
}




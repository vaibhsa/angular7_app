import { NgZone } from '@angular/core';

import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import { map } from 'rxjs/operators';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

declare var Auth0Lock;

@Injectable()

export class ProductService {
	
  constructor (
    private http: Http, 
    private ngZone: NgZone, 
    private router: Router, 
    private flash: FlashMessagesService
  ) {}

  flag : boolean = false;

  productCart: Array<{_id: number, title: string, description: string, price: number, imagePath: string, qty: number}> = [];

  productGame() {

    // if(window.location.reload()){
    //     console.log("reloaded");
    // }
      return this.http.get(
      // 'http://localhost:3000/api/product',
      'https://angular7-shopping-cart.herokuapp.com/api/product'
      ).pipe(map(res => res.json()));
  }

}




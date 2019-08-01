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

    return this.http.get(
      'https://angular7-shopping-cart.herokuapp.com/api/product'
      // 'http://localhost:3000/api/product'
    ).pipe(map(res => res.json()));
  }

  addProduct(key: FormGroup) {

    var token = localStorage.getItem('token');   
    // console.log(token);
    var headers = new Headers();
    headers.append('content-Type','application/json');
    headers.append('Authorization','Bearer '+token);

    return this.http.post(
      // 'http://localhost:3000/api/productadd', 
      'https://angular7-shopping-cart.herokuapp.com/api/productadd',
      key.value, {
        headers:headers
    }).pipe(map(res => res.json()))
  }

  deleteProduct(data:any) {

    console.log(data);
    let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('x-token', '5');
    return this.http.delete(
      // 'http://localhost:3000/api/productadd/delete-product/'+data._id,
      'https://angular7-shopping-cart.herokuapp.com/api/productadd/delete-product/'+data._id,
      {
        headers: headers
    }).pipe(map(res => res.json()));   
  }

  updateProduct(data:any) {

    // console.log(data);
    let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('x-token', '5');
    return this.http.put(
      // 'http://localhost:3000/api/productadd/update-product',
      'https://angular7-shopping-cart.herokuapp.com/api/productadd/update-product',
      data,
      {
        headers: headers
    }).pipe(map(res => res.json()));   
  }
}




import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { ProductService } from '../services/product.services';

import { FlashMessagesService } from 'angular2-flash-messages';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

	productForm: FormGroup;
  	title: FormControl;
  	description: FormControl;
  	price: FormControl;	
  	imagePath: FormControl;

	constructor(
		private builder: FormBuilder,
		private productService: ProductService,
		private spinner: NgxSpinnerService,
		private flash: FlashMessagesService
	) {

		this.createForm();
	}

	ngOnInit() {
	
	}

	addProduct(){
		
		this.spinner.show();
	    console.log(this.productForm.value);
	    this.productService.addProduct(this.productForm)
	    .subscribe(
	        data => {

	          console.log(data);
	          this.spinner.hide();    
	          this.productForm.reset();      
	          this.flash.show('Product added successfully', { timeout: 3000,cssClass: 'alert-danger' });
	        },
	        error => {

	          this.spinner.hide();
	          this.productForm.reset();
	          console.log(error);
	          // console.log(Response);
	        }
	    );    

		console.log(this.productForm.value);
	}

	createForm(){
	  	
	  	this.title = new FormControl('', [

        	Validators.required
	    ]);
	    this.description = new FormControl('', [

	        Validators.required
	    ]);
	    this.price = new FormControl('', [

	    	Validators.required,
	    	Validators.pattern("^[0-9]*$")
	    ]);
	    this.imagePath = new FormControl('', [

	    	Validators.required
	    ]);

	    this.productForm = this.builder.group({

		    title: this.title,
		    description: this.description,
		    price: this.price,
		    imagePath: this.imagePath,
		    
	    });
	}

}

import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,FormGroup,
  FormControl,
  Validators
} from '@angular/forms';



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
  	image: FormControl;

	constructor(private builder: FormBuilder) {

		this.createForm();
	}

	ngOnInit() {
	}
	addProduct(){
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
	    this.image = new FormControl('', [

	    	Validators.required
	    ]);

	    this.productForm = this.builder.group({

		    title: this.title,
		    description: this.description,
		    price: this.price,
		    image: this.image,
		    
	    });
	}

}

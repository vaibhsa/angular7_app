import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { ProductService } from '../services/product.services';

import { FlashMessagesService } from 'angular2-flash-messages';

import { NgxSpinnerService } from 'ngx-spinner';

import {MultiSelectModule} from 'primeng/multiselect';

import {SelectItem} from 'primeng/api';

import { MessageService } from 'primeng/api';
// import { MessageService } from "primeng/components/common/messageservice";


interface Tag {
    name: string,
    code: string
}

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
  	typeProduct: FormControl;
  	typeTag: FormControl;

  	itemList = [];
	selectedItems = [];
	settings = {};

	tags: SelectItem[];
	selectedTag: Tag[];

	constructor(
		private builder: FormBuilder,
		private productService: ProductService,
		private spinner: NgxSpinnerService,
		private flash: FlashMessagesService,
		private messageService: MessageService
	) {

		this.createForm();
	}

	ngOnInit() {

		this.itemList = [
        	{"id":1,"itemName":"Clothes"},
        	{"id":2,"itemName":"Video Game"},
        	{"id":3,"itemName":"Shoes"},
        	{"id":4,"itemName":"Jackets"},
        	{"id":5,"itemName":"Glasses"},    
        	{"id":6,"itemName":"Mobile Phone"}                      
        ];
    	
    	this.tags = [
            {label:'Home Delivery', value:{id:1, name: 'Home Delivery', code: 'HD'}},
            {label:'Warranty', value:{id:2, name: 'Warranty', code: 'WRT'}},
            {label:'Customer Service', value:{id:3, name: 'Customer Service', code: 'CS'}},
            {label:'Finance', value:{id:4, name: 'Finance', code: 'FN'}},
            {label:'Installation & Configuration', value:{id:5, name: 'Installation & Configuration', code: 'InC'}},
			{label:'Customization', value:{id:4, name: 'Customization', code: 'CST'}},
			{label:'Updates', value:{id:4, name: 'Updates', code: 'UDT'}},
			{label:'Services', value:{id:4, name: 'Services', code: 'SRV'}},
			{label:'Craft Clothes', value:{id:4, name: 'Craft Clothes', code: 'CC'}},
			{label:'Handicraft', value:{id:4, name: 'Handicraft', code: 'HC'}}            
        ];
    	// this.selectedItems = [{"id":1,"itemName":"India"}];
		this.settings = { singleSelection: true, text:"Select Product Type"};	
	}

	
	onItemSelect(item:any){
		// this.selectedItems =item;
		console.log(item);
		console.log(this.selectedItems);
	}
	
	onItemSelectMulti(item:any){
		console.log(item);
		console.log(this.selectedTag);	
	}

	OnItemDeSelect(item:any){
		console.log(item);
		console.log(this.selectedItems);
	}
	
	onSelectAll(items: any){
		console.log(items);
	}

	onDeSelectAll(items: any){

		console.log(items);
	}

	addProduct(){
		
		// this.spinner.show();
		this.productForm.value.typeProduct = this.productForm.value.typeProduct[0].itemName;
	 	var lengthIndex = this.productForm.value.typeTag.length;
	 	
	 	for(var i=0; i<lengthIndex; i++){
	 		this.productForm.value.typeTag[i] = this.productForm.value.typeTag[i].name;
	 	}
		console.log(this.productForm); 
	    this.productService.addProduct(this.productForm)
	    .subscribe(
	        data => {

	          console.log(data);
	          this.spinner.hide();    
	          this.productForm.reset();      
	          this.messageService.add({severity:'success', summary:'Product added successfully', detail:'Via Products'});
	          // this.flash.show('Product added successfully', { timeout: 3000,cssClass: 'alert-danger' });
	        },
	        error => {

	          this.spinner.hide();
	          this.productForm.reset();
	          console.log(error);
	          // console.log(Response);
	        }
	    );    
	}

	createForm() {
	  	
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

	    this.typeProduct = new FormControl([], [

	    	Validators.required
	    ]);

	    this.typeTag = new FormControl([], [

	    	Validators.required
	    ]);
	    
	    this.productForm = this.builder.group({

		    title: this.title,
		    description: this.description,
		    price: this.price,
		    imagePath: this.imagePath,
		    typeProduct: this.typeProduct,
		    typeTag: this.typeTag
	    });
	}

}

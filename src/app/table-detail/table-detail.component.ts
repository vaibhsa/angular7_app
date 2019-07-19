import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.services';
import { Product } from '../interfaces/product';

import { AuthService } from '../services/auth.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {
	
  name: any;

  products: Array<Object> =[];
  tableData: Array<Object> =[];
  users: Array<Object> =[];
  usersLogged: Array<Object> =[];
  totalProducts: any;
  totalUsers: any;
  totalLogged: any;
  displayDialog: boolean;
  tableName: string;
  product:Product;
  colsProduct: any[];


  constructor(
  	private route: ActivatedRoute,
  	private productService: ProductService, 
  	private authService: AuthService,
  	private spinner: NgxSpinnerService
  ) { }

  	ngOnInit() {

  		this.colsProduct = [
            { field: 'title', header: 'Title' },
            { field: 'description', header: 'Description' },
            { field: 'price', header: 'Price' },
            { field: 'typeProduct', header: 'Type Product' }
        ];

	  	this.name = this.route.snapshot.paramMap.get('id');
	    this.spinner.show();

	  	if(this.name == 'product'){
	  		this.tableName = "product";
	  		this.productData();
	  	} else if(this.name == 'users'){
	  		this.tableName = "users";
	  		this.usersData();
	  	} else if(this.name == 'loggedin'){
	  		this.tableName = "loggedin";
	  		this.loggedInData();
	  	}
  	}

  	showDialogToAdd() {
        this.product = { title:'', description:'', price:'', typeProduct:''};
        this.displayDialog = true;
    }

  	productData(){
	  	this.productService.productGame().subscribe(
		    (data)=>{
		        
		        // for(var i=0;i<4;i++){
		        // 	this.products[i] = data.products[i];	
		        // }
		        this.tableData = data.products;
		        this.totalProducts = data.products.length;
		        this.spinner.hide();
		        console.log(this.tableData);
		      },      
		      error=> alert(error),
		      ()=>console.log('Finished checkParam()') // Will execute whether success or error.
		);
  	}

  	usersData(){
  	
	  	this.authService.getAllUsers().subscribe(
		  	(data) =>{

		  		// for(var i=0;i<4;i++){
		    //     	this.users[i] = data.users[i];	
		    //     }
		        this.tableData = data.users;
		        this.totalUsers = data.users.length;
		        this.spinner.hide();
		  		console.log(this.tableData);
		  	}
		);
	}

  	loggedInData(){
  	
	  	this.authService.getAllLoggedIn().subscribe(
		  	(data) =>{

		        this.tableData = data.users;
		        this.totalLogged = data.users.length;
		        this.spinner.hide();
		  		console.log(this.tableData);
		  	}
		);
  	}

  	save() {
    
        this.displayDialog = false;
    }

    delete() {
    
        this.displayDialog = false;
    }

    onRowSelect(event) {
        // this.newCar = false;
        // this.car = this.cloneCar(event.data);
        this.product = event.data;
        console.log(event);
        this.displayDialog = true;
    }
}

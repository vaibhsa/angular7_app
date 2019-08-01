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
  deleteBtn: boolean;
  tableName: string;
  product:Product;
  dataDialog:any;
  cols: any[];
  itemList = [];
  settings = {};

  constructor(
  	private route: ActivatedRoute,
  	private productService: ProductService, 
  	private authService: AuthService,
  	private spinner: NgxSpinnerService
  ) { }

	ngOnInit() {

  	this.name = this.route.snapshot.paramMap.get('id');
    this.spinner.show();

  	if(this.name == 'product'){
  		this.tableName = "product";
      this.dataDialog = {
        "title":'',
        "description":'',
        "price":'',
        "typeProduct":''
      };
      this.cols = [
        { field: 'title', header: 'Title' },
        { field: 'description', header: 'Description' },
        { field: 'price', header: 'Price' },
        { field: 'typeProduct', header: 'Type Product' }
      ];
  		this.productData();
  	} else if(this.name == 'users'){
  		this.tableName = "users";
      this.dataDialog = {
        "username":'',
        "email":'',
        "role":'',
        "image_url":''
      };
      this.cols = [
        { field: 'username', header: 'Username' },
        { field: 'email', header: 'Email' },
        { field: 'role', header: 'Role' },
        { field: 'image_url', header: 'Image Url' }
      ];
  		this.usersData();
  	} else if(this.name == 'loggedin'){
  		this.tableName = "loggedin";
      this.dataDialog = {
        "email":'',
        "token":''
      };
  		this.loggedInData();
  	}

    this.itemList = [
      {label:'Clothes', value:'Clothes'},
      {label:'Video Game', value:'Video Game'},
      {label:'Shoes', value:'Shoes'},
      {label:'Jackets', value:'Jackets'},
      {label:'Glasses', value:'Glasses'},
      {label:'Mobile Phone', value:'Mobile Phone'}
    ];
    this.settings = { singleSelection: true }; 
  }

	showDialogToAdd() {
    this.deleteBtn = false;
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
      error => alert(error),
      () => console.log('Finished checkParam()') // Will execute whether success or error.
	  );
	}

	usersData(){
	
  	this.authService.getAllUsers().subscribe(
	  	(data) =>{
	  	// for(var i=0;i<4;i++){
	    //     	this.users[i] = data.users[i];	
	    // }
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

	save(data: any) {
    
    console.log(this.dataDialog);
    if(data == 'product'){

      console.log(data);
      this.productService.updateProduct(this.dataDialog).subscribe(
        (data)=>{
          console.log(data);
        },      
        error => alert(error),
        () => console.log('Finished checkParam()') // Will execute whether success or error.
      );
    }else if(data == 'user'){

      console.log(data);
      this.authService.updateUser(this.dataDialog).subscribe(
        (data) =>{
          console.log(data);
      });
    }else if(data == 'loggedIn'){

      console.log(data);
      this.authService.updateLoggedIn(this.dataDialog).subscribe(
        (data) =>{
          console.log(data);
      });
    }  
    this.displayDialog = false;
  }

  delete(data: any) {
    
    if(data == 'product'){

      console.log(data);
      if(confirm("Are you sure to delete "+this.dataDialog.title+". It is good Product")) {
        // this.spinner.show();
        this.productService.deleteProduct(this.dataDialog).subscribe(
          (data)=>{
            if(data.Status == "Success"){     
              this.productData();
              alert(data.message);
            }
          },      
          error => alert(error),
          () => console.log('Finished checkParam()') // Will execute whether success or error.
        );
        this.dataDialog = {
          "title":'',
          "description":'',
          "price":'',
          "typeProduct":''
        };
      }
    }else if(data == 'user'){
      if(confirm("Are you sure to delete user "+this.dataDialog.username+".")) {
        this.authService.deleteUser(this.dataDialog).subscribe(
          (data) => {
              if(data.Status == "Success"){     
                this.usersData();
                alert(data.message);
              }
            },      
            error => alert(error),
            () => console.log('Finished checkParam()') // Will execute whether success or error.
        );
        this.dataDialog = {
          "username":'',
          "email":'',
          "role":'',
          "image_url":''
        };
      }

      this.dataDialog = {
        "username":'',
        "email":'',
        "role":'',
        "image_url":''
      };
    }else if(data == 'loggedIn'){
    
      if(confirm("Are you sure to delete user "+this.dataDialog.username+".")) {
        this.authService.deleteLoggedIn(this.dataDialog).subscribe(
          (data) =>{
            if(data.Status == "Success"){     
                  this.loggedInData();
                  alert(data.message);
                }
              },      
              error => alert(error),
              () => console.log('Finished checkParam()') // Will execute whether success or error.
        );
        this.dataDialog = {
          "email":'',
          "token":''
        };
      }

      this.dataDialog = {
        "email":'',
        "token":''
      };
    }  
    this.displayDialog = false;
  }

  cancelPDialog(data:any){
    
    if(data == "product"){
      this.dataDialog = {
        "title":'',
        "description":'',
        "price":'',
        "typeProduct":''
      };
    }else if(data == "loggedin"){
      this.dataDialog = {
        "email":'',
        "token":''
      };
    }else if(data == "user"){
      this.dataDialog = {
          "username":'',
          "email":'',
          "role":'',
          "image_url":''
      };
    }
  }

  onRowSelect(event, tableName) {

    console.log(tableName);
    this.deleteBtn = true;
    this.dataDialog = event.data;
    // if(tableName == 'product')
    //   this.product = event.data;
    //   console.log(event);
    // }else if(tableName == 'user'){
    //   this.product = event.data;
    //   console.log(event);
    // }else if(tableName == 'loggedin'){
    //   this.product = event.data;
    //   console.log(event);
    // }  
    this.displayDialog = true;
  }
}

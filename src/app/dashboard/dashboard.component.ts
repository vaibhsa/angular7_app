import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.services';
import { AuthService } from '../services/auth.services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  // type MyArrayType = Array<{_id: string, title: string, imagePath: string, description: string, price: number, tags: Array, typeProduct: string}>;

  // products: MyArrayType;
  
  products: Array<Object> =[];
  users: Array<Object> =[];
  usersLogged: Array<Object> =[];
  totalProducts: any;
  totalUsers: any;
  totalLogged: any;
  
  constructor(
  	private router: Router,
  	private productService: ProductService, 
  	private spinner: NgxSpinnerService,
  	private authService: AuthService,
  ) { }

    ngOnInit() {
  	
  	  this.spinner.show();
  	  this.productService.productGame().subscribe(
	    (data)=>{
	        
	        for(var i=0;i<4;i++){
	        	this.products[i] = data.products[i];	
	        }
	        
	        this.totalProducts = data.products.length;
	        this.spinner.hide();
	        // console.log(data.products[0]);
	      },      
	      error=> alert(error),
	      ()=>console.log('Finished checkParam()') // Will execute whether success or error.
	  );
	  this.authService.getAllUsers().subscribe(
	  	(data) =>{

	  		for(var i=0;i<4;i++){
	        	this.users[i] = data.users[i];	
	        }
	        
	        this.totalUsers = data.users.length;
	  		// console.log(data.users[0]);
	  	}
	  );
	  this.authService.getAllLoggedIn().subscribe(
	  	(data) =>{
	  		if(data.users.length < 4){
				for(var i=0;i<(data.users.length);i++){
	        		this.usersLogged[i] = data.users[i];	
	        	}	  			
	  		}else{
		  		for(var i=0;i<4;i++){
		        	this.usersLogged[i] = data.users[i];	
		        }
	    	}
	        
	        this.totalLogged = data.users.length;
	  		console.log(data.users);
	  	}
	  );
    }
    
    navigateTableDetail( value: any ){
    	console.log(value);
    	this.router.navigate(['/tableDetail', {id: value}]);
    }

}

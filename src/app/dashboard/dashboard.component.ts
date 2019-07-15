import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  products:any;
  
  constructor(private productService: ProductService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  	  this.spinner.show();
  	  this.productService.productGame().subscribe(
	    (data)=>{
	        this.spinner.hide();
	        this.products = data.products;
	        console.log(data.products);
	      },      
	      error=> alert(error),
	      ()=>console.log('Finished checkParam()') // Will execute whether success or error.
	  );
  }

}

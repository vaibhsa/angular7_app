import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productCart: Array<{_id: number, title: string, description: string, price: number, imagePath: string, qty: number}> = [];
  // price: number;
  totalPrice:number;

  constructor() { 
    
    if(JSON.parse(localStorage.getItem("products")) != null){
  	 this.productCart = JSON.parse(localStorage.getItem("products"));
    }
  	// this.productCart.price *= this.productCart.qty;
    console.log(this.productCart);
  	this.createProductObj();
  }

  ngOnInit() {

  }

  createProductObj(){

  	this.totalPrice =0;
    if(this.productCart !=null){
    
    	for(var i=0; i< this.productCart.length; i++){
    		this.productCart[i].price *= this.productCart[i].qty;
    		this.totalPrice += this.productCart[i].price;
    	}
    }  
  }

  reduceByOne(product:any){
    
    console.log(product);
    
    for(var i=0; i< this.productCart.length; i++){

      if(this.productCart[i]._id == product._id){
        
        console.log("Clicked reduceByOne");
        this.productCart[i].price  /= this.productCart[i].qty;
        this.totalPrice -= this.productCart[i].price;
        this.productCart[i].qty -= 1;
        this.productCart[i].price *= this.productCart[i].qty;
      }

      if(this.productCart[i].qty == 0){
        
        console.log(this.totalPrice);
        this.productCart.splice(i, 1);    
        localStorage.setItem("products", JSON.stringify(this.productCart));
        var qtyP = this.productCart.length;
        localStorage.setItem('qty', qtyP.toString());
      }
       
    }
  }

  removeAll(product:any){
   
    console.log("Clicked removeAll");

    var index;

    for(var i=0; i< this.productCart.length; i++){

      if(this.productCart[i]._id == product._id){
        index=i;
        break;
      }
    }

    this.productCart.splice(index, 1);
    
    this.totalPrice = 0;
    
    for(var i=0; i< this.productCart.length; i++){

      this.totalPrice += this.productCart[i].price;
    }
    
    localStorage.setItem("products", JSON.stringify(this.productCart));
    var qtyP = this.productCart.length;
    console.log(this.productCart);
    localStorage.setItem('qty', qtyP.toString());

  }

}




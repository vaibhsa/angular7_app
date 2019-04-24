import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  products:any;
  
  productCart: Array<{_id: number, title: string, description: string, price: number, imagePath: string, qty: number}> = [];

  constructor() { 

  	this.products = [
		{ _id: 1, title: 'Gothic Video Game', description: 'Awesome Game!!!!', price:10, imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png'},
		{ _id: 2, title: 'Call of Duty Video Game', description: 'Meh ... nah its okay I guess', price:40, imagePath:'https://support.activision.com/servlet/servlet.FileDownload?file=00PU000000Rq6tz'},
		{ _id: 3, title: 'World of Warcraft Video Game', description: 'Also awesome? But of course it was better in vanilla ...' , price:20, imagePath:'http://eu.blizzard.com/static/_images/games/wow/wallpapers/wall2/wall2-1440x900.jpg'},
		{ _id: 4, title: 'Minecraft Video Game', description: 'Now that is super awesome!' , price: 15, imagePath: 'https://pmcdeadline2.files.wordpress.com/2014/02/minecraft__140227211000.jpg'},
		{ _id: 5, title: 'Dark Souls 3 Video Game', description: 'I Died!', price:20, imagePath: 'https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/assets/img/DARKSOUL_facebook_mini.jpg'}
  	];

  }
  
  ngOnInit() {

  }


  cart(product: any){

    // console.log(product);
    this.cartQty(product);
    
    // this.productCart.push(product);
    var qtyP = this.productCart.length;

    console.log(this.productCart);
    localStorage.setItem('qty', qtyP.toString());

    // this.cartService.setCartObj(this.productCart);

    // console.log(this.cartService.getCartObj);

  }

  cartQty(product: any){
    console.log("hello"); 
    var flag =0;
    var index=0;

    var arrayProduct = JSON.parse(localStorage.getItem("products"));
    
    console.log(arrayProduct);

    if(arrayProduct == null){

      product.qty = 1;
      this.productCart.push(product);
    }else{

      this.productCart = arrayProduct;
      var productLen = this.productCart.length;
      // console.log(productLen);
     
      for(var i=0; i < productLen; i++){
        
        if(product._id == this.productCart[i]._id){
          flag=1;
          index= i;
          break;
        }
      }
      if(flag == 1){

        this.productCart[index].qty += 1;
      }else{
        
        product.qty = 1;
        this.productCart.push(product);
      }
    }
    localStorage.setItem("products", JSON.stringify(this.productCart));
    
  }


}



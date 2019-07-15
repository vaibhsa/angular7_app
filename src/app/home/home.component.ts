import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.services';
import { ProductService } from '../services/product.services';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  products:any;
  
  productCart: Array<{_id: number, title: string, description: string, price: number, imagePath: string, qty: number}> = [];

  constructor(

    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService    
  ) { }
  
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
  filter(value:any){
    // this.selectedItems =item;
    console.log(value);
  }

  cart(product: any) {

    // console.log(product);
    this.cartQty(product);
    
    // this.productCart.push(product);
    
    var arrayProduct = JSON.parse(localStorage.getItem("products"));
    console.log(arrayProduct);
    // var qtyP = arrayProduct.length;
    
    var qtyP = this.productCart.length;

    localStorage.setItem("qty", qtyP.toString());

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
      
      this.productCart = [];
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



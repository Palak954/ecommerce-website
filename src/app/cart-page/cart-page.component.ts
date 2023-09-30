import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Cart } from 'src/cart';
import { priceSummary } from 'src/priceSummary';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems : Cart[];
  priceSummary : priceSummary={
    Amount: 0 , 
    Tax: 0 , 
    Discount: 0 , 
    Delivery: 0 , 
    Total: 0
  };
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
    this.productService.getCartItems().subscribe((result)=>{
      this.cartItems = result;
      let price = 0;
      result
      .forEach((product)=>{
        price = price + (product.price*product.quantity);
      })
      this.priceSummary.Amount = price;
      this.priceSummary.Tax= price/10;
      this.priceSummary.Discount=price/10;
      this.priceSummary.Delivery =100;
      this.priceSummary.Total = price+price/10+100-price/10;
    })
    
    this.productService.getCartItems();
  }
  removeToCart(id : number){
    this.productService.removeToCart(id).subscribe((result)=>{
      console.log(result);
    })
  }
}
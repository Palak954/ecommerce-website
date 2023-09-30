import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Order } from 'src/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice : number;
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
      this.productService.getCartItems().subscribe((result)=>{
      let price = 0;
      result
      .forEach((product)=>{
        price = price + (product.price*product.quantity);
      })
      this.totalPrice = price+price/10+100-price/10;
    })
    
    this.productService.getCartItems();
  
  }
  checkoutform(data : {email:string , address:string , phone:number}){
    let user = localStorage.getItem("user");
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderdata : Order = {
        ...data , 
        totalPrice : this.totalPrice , 
        userId
      }
      this.productService.orderNow(orderdata).subscribe((result)=>{
        console.log(result);
      })
    }

    }
}

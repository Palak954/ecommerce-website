import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Order } from 'src/order';
import { Router } from '@angular/router';
import { Cart } from 'src/cart';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice : number;
  cartData : Cart[];
  message : string;
  constructor(private productService : ProductsService , private route : Router) { }

  ngOnInit(): void {
      this.productService.getCartItems().subscribe((result)=>{
      let price = 0;
      this.cartData = result;
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
        userId , 
        id : undefined
      }
      this.cartData.forEach((item)=>{
        setTimeout(()=>{
        item.id && this.productService.deleteCartItems(item.id);
        } , 1000);
      })
      this.productService.orderNow(orderdata).subscribe((result)=>{
        if(result){
          this.message = "Order has been Placed";
          setTimeout(()=>{
            this.message = undefined;
          } , 4000);
          alert("Order Placed");
          this.route.navigate(["my-orders"])
        }
      })
    }

    }
}

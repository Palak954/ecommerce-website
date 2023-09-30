import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/products';
import { ProductsService } from '../services/products.service';
import { Cart } from 'src/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute , private productService : ProductsService) { }
  product : undefined | Products;
  cartdata : Products | undefined;
  count : number = 1;
  removeItem : boolean = false;
  ngOnInit(): void {
    let Id = this.activatedRoute.snapshot.paramMap.get("id");
    console.warn(Id);
    Id && this.productService.fetchProduct(Id).subscribe((data)=>{
    this.product = data;
    let cartData = localStorage.getItem('localcart');
    if(cartData && Id){
      let localCartObj=JSON.parse(cartData);
      localCartObj = localCartObj.filter((item:Products)=>
      Id === item.id.toString());
      if(localCartObj.length)
      this.removeItem = true;
      else
      this.removeItem = false;
    }
    let user = localStorage.getItem("user");
    if(user){
      let userId = user && JSON.parse(user).id;
      this.productService.getCartList(userId);
      this.productService.cartData.subscribe((result)=>{
        console.warn(result);
        let item = result.filter((item:Products)=>{
          Id === item.productId?.toString()
        })
        if(item && item.length){
          this.cartdata = item[0];
          this.removeItem = true;
        }
      })
    }
  })
  }
  
  increment(){
    if(this.count < 20)
    this.count = this.count+1;
  }
  decrement(){
    if(this.count > 1)
    this.count = this.count-1;
  }
  AdTocart(){
    if(this.product){
      this.product.quantity = this.count;
      if(!localStorage.getItem("user")){
        this.productService.cartItem(this.product);
        this.removeItem = true;
      }
      else{
        let user = localStorage.getItem("user");
        let userId = user && JSON.parse(user).id;
        let cartData : Cart = {
          ...this.product , 
          userId , 
          productId : this.product.id
        }
        delete cartData.id;
        this.productService.StoreProductIncart(cartData).subscribe((data)=>{
          if(data){
          this.productService.getCartList(userId);
          this.removeItem = true;
          }
        });
      }
    }

  }

  removeToCart(id:number){
    if(!localStorage.getItem('user')){
    this.productService.removeFromCart(id);
    }
    else{
      console.warn(this.cartdata);
      this.cartdata && this.productService.deleteCartListItem(this.cartdata.id).subscribe((result)=>{
          let user = localStorage.getItem("user");
          let userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);
      });
    }
    this.removeItem = false;
  }

}
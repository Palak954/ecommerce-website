import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute , private productService : ProductsService) { }
  productId : string;
  product : Products;

  count : number = 1;
  removeItem : boolean = false;
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.fetchProduct(this.productId).subscribe((data)=>{
      this.product = data;
    })
    let cartData = localStorage.getItem('localcart');
    if(cartData && this.productId)
    this.removeItem = true;
    else
    this.removeItem = false;
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
      }
    }

  }
}
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
  cartItem = this.productService.cartItem;
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.fetchProduct(this.productId).subscribe((data)=>{
      this.product = data;
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
  adCart(){
    this.cartItem = this.cartItem+1;
  }
}

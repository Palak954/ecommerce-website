import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from 'src/products';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts : Products[];
  cartItem = this.productsService.cartItem;
  alProducts : Products[];
  constructor(private productsService : ProductsService , private route : Router){}
  ngOnInit(): void {
    this.productsService.popularProducts().subscribe((data)=>{
      this.popularProducts = data;
      console.log(this.popularProducts);
    });
    this.productsService.getProduct().subscribe((data)=>{
      this.alProducts = data;
    });
  }
  addToCart(){
    this.cartItem = this.cartItem+1;
  }
  openProduct(id:string){
    this.route.navigate(["product-details/"+id]);
  }
}

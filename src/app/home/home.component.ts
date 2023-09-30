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
  alProducts : Products[];
  constructor(private productsService : ProductsService , private route : Router){}
  ngOnInit(): void {
    this.productsService.popularProducts().subscribe((data)=>{
      this.popularProducts = data;
      // console.log(this.popularProducts);
    });
    this.productsService.getProduct().subscribe((data)=>{
      this.alProducts = data;
    });
  }
  openProduct(id:number){
    this.route.navigate(["product-details/"+id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from 'src/products';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts : Products[];
  count = this.productsService.count;
  alProducts : Products[];
  constructor(private productsService : ProductsService){}
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
    this.count++;
  }

}

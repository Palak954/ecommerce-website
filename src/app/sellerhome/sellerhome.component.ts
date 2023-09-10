import { Component, OnInit } from '@angular/core';
import { Products } from 'src/products';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellerhome',
  templateUrl: './sellerhome.component.html',
  styleUrls: ['./sellerhome.component.css']
})
export class SellerhomeComponent implements OnInit {
  constructor(private productsService : ProductsService , private route : Router) { }
  Productdata : Products[];
  icon = faCoffee;
  ngOnInit(): void {
    this.productList();
  }

  delete(id:string){
    this.productsService.deleteProduct(id).subscribe((data)=>{
      console.log(data);
    });
    this.productList();

  }
  productList(){
    this.productsService.getProduct().subscribe((data)=>{
      this.Productdata = data;
      console.log(this.Productdata);
    })
  }
  update(id:string){
    this.route.navigate(["seller-add-product/"+id]);
  }

}

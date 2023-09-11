import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/products';
import { ProductsService } from '../services/products.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  constructor(private productService: ProductsService , private activatedRoute : ActivatedRoute , private http : HttpClient , private route : Router) { }
  @ViewChild("products") productform : NgForm;
  productMessage :string = "";
  productId : string;
  product : Products;
  ngOnInit(): void {
  }
  adProducts(data : Products){
    this.productService.postProduct(data).subscribe((result)=>{
      console.log(result);
      if(result)
      this.productMessage = "Product has been added successfully";
      setTimeout(()=>{
      this.productMessage = undefined
      this.route.navigate(["seller-home"]);
     } , 2000);
    });
}
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/products';
import { ProductsService } from '../services/products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute , private productService : ProductsService , private route : Router) { }
  productdId : string;
  product : Products;
  message:string;
  @ViewChild("products") form : NgForm;
  ngOnInit(): void {
    this.productdId = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.getProduct().subscribe((data)=>{
      this.product = data.find((product)=>product.id.toString() == this.productdId);
    })
  }
  updateProducts(data : Products){
    this.productService.putProduct(this.product , this.productdId).subscribe((value)=>{
      if(value)
      this.message = " Product has updated Successfully ";
      setTimeout(()=>{
        this.message = "";
        this.route.navigate(["seller-home"]);
      } , 2000);
    })
  }
}

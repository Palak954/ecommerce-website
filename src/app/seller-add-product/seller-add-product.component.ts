import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/products';
import { ProductsService } from '../services/products.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  constructor(private productService: ProductsService , private activatedRoute : ActivatedRoute , private http : HttpClient) { }
  @ViewChild("products") productform : NgForm;
  productMessage :string = "";
  productId : string;
  product : Products;
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.getProduct().subscribe((data)=>{
      this.product = data.find((product)=>product.id == this.productId);
    })
    // this.productform.setValue({
    //   name:this.product.name , 
    //   description:this.product.description , 
    //   color:this.product.color , 
    //   price:this.product.price , 
    //   image:this.product.image , 
    //   category:this.product.category
    // })
  }
  adProducts(data : Products){
    if(this.adProducts == null){
    this.productService.postProduct(data).subscribe((result)=>{
      console.log(result);
      if(result)
      this.productMessage = "Product has been added successfully";
      setTimeout(()=>{
      this.productMessage = undefined
      this.productform.reset();
     } , 2000);
    });
  }
  else{
    this.productService.putProduct(data , data.id).subscribe((result)=>{
      console.log(result);
      if(result)
      this.productMessage = "Product has been updated successfully";
      setTimeout(()=>{
      this.productMessage = undefined
      this.productform.reset();
     } , 2000);
    });
  }
}
}
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/products';
import { faTrash , faEdit } from '@fortawesome/free-solid-svg-icons';
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
  editicon = faEdit;
  deleteicon = faTrash;
  ngOnInit(): void {
    this.productList();
  }

  delete(id:number){
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
  update(id:number){
    this.route.navigate(["seller-update-product/"+id]);
  }
}

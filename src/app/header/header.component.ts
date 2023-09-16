import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Products } from 'src/products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype : string = "default";
  cartItem : number = this.productService.cartItem;
  sellerName : string = "";
  searchProduct : Products[];
  constructor(private route : Router , private productService :ProductsService) { }
  ngOnInit(): void {
    this.route.events.subscribe((data:any)=>{
      if(data.url){
      if(localStorage.getItem("seller") && data.url.includes("seller")){
      this.menutype = "seller";
      let sellerstore = localStorage.getItem("seller");
      let sellerdata = JSON.parse(sellerstore);
      if(sellerdata[0])
      this.sellerName = sellerdata[0].name;
      else
      this.sellerName = sellerdata.name;
      }
      else
      this.menutype = "default";
      }
    })
  }
  logout(){
    localStorage.removeItem("seller");
    this.route.navigate(["/"]);
  }
  searchProducts(query : KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe((data : Products[])=>{
        this.searchProduct = data;
      })
    }

  }

  disablelist(){
    this.searchProduct = undefined;
  }
  search(data:string){
    console.log(data);
    this.route.navigate([`search/${data}`])
  }
  selectItem(id : string){
    this.route.navigate(["/product-details/"+id]);
  }
}

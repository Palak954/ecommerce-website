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
  sellerName : string = "";
  userName : string = "";
  searchProduct : Products[];
  cartItem : number=0;
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
      else if(localStorage.getItem("user")){
      let userstore = localStorage.getItem("user");
      let userdata = JSON.parse(userstore);
      this.userName = userdata.name;
      this.menutype = "user";
      }
      else
      this.menutype="default";
      }
  })
  let cartData = localStorage.getItem('localcart');
  if (cartData != null ){
    this.cartItem  =JSON.parse(cartData).length ;
  }
  this.productService.cartData.subscribe((data)=>{
    this.cartItem = data.length;
  })
  }
  logoutseller(){
    localStorage.removeItem("seller");
    this.route.navigate(["/"]);
  }
  logoutuser(){
    localStorage.removeItem("user");
    this.route.navigate(["user-auth"]);
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

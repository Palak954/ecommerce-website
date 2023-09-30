import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/Login';
import { signup } from 'src/Signup';
import { UsersignupService } from '../services/usersignup.service';
import { UserloginService } from '../services/userlogin.service';
import { Products } from 'src/products';
import { Cart } from 'src/cart';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  signIn : boolean = true;
  loginData : string = "";
  constructor(private route : Router , private userService : UsersignupService , private userLogin : UserloginService , private productService : ProductsService) { }
  ngOnInit(): void {
    this.userService.reloaduser();
  }
  signupLogin(value : Login){
    this.userLogin.Loginuser(value);
    this.userLogin.message.subscribe((data)=>{
      if(data){
      console.warn("login failed");
      this.loginData = "login failed";
      }
      else{
        this.localCartToRemoteCart();
      }
    })
  }
  signupUser(value : signup){
    this.userService.postSignup(value);
    console.log("login start");
    this.localCartToRemoteCart();
    console.log("login complete");
  }
  signup(){
    this.signIn = false;
  }
  login(){
    this.signIn = true;
  }
  localCartToRemoteCart(){
    let cartData = localStorage.getItem('localcart');
    let user = localStorage.getItem("user");
    let userId = user && JSON.parse(user).id;
          if(cartData){
            let cartdataList : Products[] = JSON.parse(cartData);
            cartdataList.forEach((product : Products , index : number) => {
              let cartDetails : Cart = {
                ...product , 
                userId , 
                productId : product.id
              };
              delete cartDetails.id;
              this.productService.StoreProductIncart(cartDetails).subscribe((data)=>{
                if(data)
                console.log("data");
                else
                console.warn("data not present inside");
              })
              if(cartdataList.length == index+1){
              localStorage.removeItem('localcart');
              }
            });
          }
          setTimeout(()=>{
            this.productService.getCartList(userId);
          } , 2000);
  }
}
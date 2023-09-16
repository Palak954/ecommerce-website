import { Component, OnInit , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from '../services/sellersignup.service';
import { signup } from 'src/Signup';
import { Router } from '@angular/router';
import { LoginService } from '../services/sellerlogin.service';
import { Login } from '../../Login';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  @ViewChild("sellerSignup") sellerSignupform : NgForm;
  @ViewChild("sellerLogin") sellerLoginform : NgForm;
  messagefailed : string = "";
  constructor(private signupService : SignupService , private route : Router , private loginService : LoginService) { }
  signIn : boolean = true;
  ngOnInit(): void {
    this.signupService.reloadSeller();
  }
  signupSeller(value : signup){
    if(this.sellerSignupform.valid == true){
    alert("form submitted");
    this.signupService.postsignup(value);
  }
}
  signupLogin(value: Login){
      this.messagefailed = "";
      this.loginService.LoginUser(value);
      this.loginService.loginfailed.subscribe((data)=>{
        if(data){
          this.messagefailed = "login credentials are wrong";
        }
      })
    }
  signup(){
    this.signIn = false;
  }
  login(){
    this.signIn = true;
  }
}

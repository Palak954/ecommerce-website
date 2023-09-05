import { Component, OnInit , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { signup } from 'src/signup';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../login';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  @ViewChild("seller") sellerform : NgForm;
  constructor(private signupService : SignupService , private route : Router , private loginService : LoginService) { }
  signIn : boolean = true;
  ngOnInit(): void {
    this.signupService.reloadSeller();
  }
  signupSeller(value : signup){
    if(this.sellerform.valid == true){
    alert("form submitted");
    this.signupService.postsignup(value)
  }
}
  signupLogin(value: Login){
    if(this.sellerform.valid == true){
      alert("form submitted");
      this.loginService.postLogin(value).subscribe((data)=>{
        console.log(data);
      })
    }
  }
  signup(){
    this.signIn = false;
  }
  login(){
    this.signIn = true;
  }
}

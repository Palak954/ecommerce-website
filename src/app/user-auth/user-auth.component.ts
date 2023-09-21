import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/Login';
import { signup } from 'src/Signup';
import { UsersignupService } from '../services/usersignup.service';
import { UserloginService } from '../services/userlogin.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  signIn : boolean = true;
  message : string = "";
  constructor(private route : Router , private userService : UsersignupService , private userLogin : UserloginService) { }
  ngOnInit(): void {
    this.userService.reloaduser();
  }
  signupLogin(value : Login){
    this.userLogin.Loginuser(value);
    this.userLogin.message.subscribe((data)=>{
      if(data)
      this.message = "login failed";
    })
  }
  signupUser(value : signup){
    this.userService.postSignup(value);
  }
  signup(){
    this.signIn = false;
  }
  login(){
    this.signIn = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/Login';
import { signup } from 'src/Signup';
import { UsersignupService } from '../services/usersignup.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  signIn : boolean = true;
  constructor(private route : Router , private userService : UsersignupService) { }

  ngOnInit(): void {
  }
  signupLogin(value : Login){
    console.log(value);
  }
  signupUser(value : signup){
    this.userService.postSignup(value);
    this.route.navigate(["/"]);
  }
  signup(){
    this.signIn = false;
  }
  login(){
    this.signIn = true;
  }
}

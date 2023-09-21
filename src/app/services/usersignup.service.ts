import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signup } from 'src/Signup';

@Injectable({
  providedIn: 'root'
})
export class UsersignupService {

  constructor(private http : HttpClient , private route : Router) { }
  postSignup(data : signup){
    this.http.post("http://localhost:8000/user" , data , {observe:'response'}).subscribe((result)=>{
      if(result)
      localStorage.setItem("user" , JSON.stringify(result.body));
      // console.log(result);
      this.route.navigate(["/"]);
    });
  }
  reloaduser(){
    if(localStorage.getItem("user"))
    this.route.navigate(["/"]);
  }
}
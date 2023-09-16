import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { signup } from 'src/Signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http : HttpClient , private route : Router) { }
  isLoggedIn = new BehaviorSubject<boolean>(false);
  postsignup(data : signup){
    this.http.post('http://localhost:8000/seller', data , {'observe' : 'response'}).subscribe((result)=>{
      this.isLoggedIn.next(true);
      console.log(result);
      if(result){
      localStorage.setItem("seller" , JSON.stringify(result.body));
      this.route.navigate(["/seller-home"]) }
    });
  }
  reloadSeller(){
    if(localStorage.getItem("seller")){
      this.isLoggedIn.next(true);
      this.route.navigate(["/seller-home"]);
    }
  }
}

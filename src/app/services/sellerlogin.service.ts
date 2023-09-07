import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { Login } from '../../login';
import { SignupService } from './sellersignup.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginfailed = new EventEmitter<boolean>(false);
  constructor(private http : HttpClient , private sellerSignup : SignupService , private route : Router) { }
  LoginUser(data : Login){
    this.http.get(`http://localhost:8000/seller?email=${data.email}&password=${data.password}` , {observe : 'response'}).subscribe((result:any)=>{
      console.log(result);
      if(result && result.body && result.body.length){
        localStorage.setItem("seller" , JSON.stringify(result));
        this.route.navigate(["/seller-home"]);
      }
      else{
        console.warn("login failed");
        this.loginfailed.emit(true);
      }
    })
  }
}

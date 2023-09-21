import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/Login';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  message = new EventEmitter<boolean>(false);
  constructor(private http : HttpClient , private route : Router) { }
  Loginuser(user : Login){
    return this.http.get(`http://localhost:8000/user?email=${user.email}&&password=${user.password}` , {observe:'response'}).subscribe((data:any)=>{
      if(data && data.body && data.body.length){
        localStorage.setItem("user" , JSON.stringify(data.body[0]));
        this.route.navigate(["/"]);
      }
      else{
        alert("login failed");
        this.message.emit(true);
      }
    });
  }
}

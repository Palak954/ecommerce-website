import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signup } from 'src/Signup';

@Injectable({
  providedIn: 'root'
})
export class UsersignupService {

  constructor(private http : HttpClient) { }
  postSignup(data : signup){
    this.http.post("http://localhost:8000/user" , data).subscribe((result)=>{
      if(result)
      localStorage.setItem("user" , JSON.stringify(result));
      console.log(result);
    });
  }
}
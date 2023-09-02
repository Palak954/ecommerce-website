import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signup } from 'src/signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http : HttpClient) { }
  postsignup(data : signup){
    return this.http.post('http://localhost:8000/seller', data);
  }
  getsignup(){
    return this.http.get('http://localhost:8000/seller');
  }
}

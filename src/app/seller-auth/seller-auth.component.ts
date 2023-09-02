import { Component, OnInit , ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { signup } from 'src/signup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  @ViewChild("seller") sellerform : NgForm;
  constructor(private signupService : SignupService , private route : Router) { }

  ngOnInit(): void {
  }
  onSubmit(value : signup){
    if(this.sellerform.valid == true){
    alert("form submitted");
    this.signupService.postsignup(value).subscribe((data)=>{
      console.log(data);
    });
    this.route.navigate(["/seller-home"]);
  }
  else{
    alert('invalid form');
    this.route.navigate(["/seller-auth"])
  }
    
  }
}

import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/sellersignup.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype : string = "default";
  constructor(private route : Router) { }
  sellerName : string = "";
  ngOnInit(): void {
    this.route.events.subscribe((data:any)=>{
      if(data.url){
      if(localStorage.getItem("seller") && data.url.includes("seller")){
      this.menutype = "seller";
      // console.log(localStorage.getItem("seller"));
      }
      else
      this.menutype = "default";
      }
    })
  }
  logout(){
    localStorage.removeItem("seller");
    this.route.navigate(["/"]);
  }
}

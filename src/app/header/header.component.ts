import { Component, OnInit } from '@angular/core';
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
      let sellerstore = localStorage.getItem("seller");
      let sellerdata = JSON.parse(sellerstore);
      if(sellerdata[0])
      this.sellerName = sellerdata[0].name;
      else
      this.sellerName = sellerdata.name;
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

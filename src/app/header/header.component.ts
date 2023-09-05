import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private signupService : SignupService , private route : Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.signupService.isLoggedIn.next(false);
    localStorage.clear();
    this.route.navigate(["/home"]);
  }
}

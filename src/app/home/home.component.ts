import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from 'src/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {

  }

}

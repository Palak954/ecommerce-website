import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  productName : string;
  product : Products;
  constructor(private activatedRoute : ActivatedRoute , private productService : ProductsService) { }

  ngOnInit(): void {
    this.productName = this.activatedRoute.snapshot.paramMap.get("query");
    this.productService.getProduct().subscribe((data)=>{
      this.product = data.find((p)=>p.name == this.productName);
      console.log(this.product);
    })
  }

}

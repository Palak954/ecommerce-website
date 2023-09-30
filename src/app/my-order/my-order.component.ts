import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Order } from 'src/order';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orders : Order[];
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
    this.productService.orderList().subscribe((result)=>{
      this.orders = result;
    })
  }
  cancelOrder(id : number){
    this.productService.removeOrder(id).subscribe((result)=>{
      console.log(result);
    });
    this.ngOnInit();
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Products } from 'src/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http : HttpClient) { }
  postProduct(data : Products){
    return this.http.post("http://localhost:8000/products" , data)
  }
  getProduct(){
    return this.http.get<Products[]>("http://localhost:8000/products");
  }
  deleteProduct(id:string){
    return this.http.delete<Products>(`http://localhost:8000/products/${id}`)
  }
  putProduct(data:Products , id:string){
    return this.http.put<Products>(`http://localhost:8000/products/${id}` , data);
  }
}
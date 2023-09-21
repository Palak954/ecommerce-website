import { HttpClient } from '@angular/common/http';
import { Injectable , EventEmitter} from '@angular/core';

import { Products } from 'src/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http : HttpClient) { }
  cartData = new EventEmitter<Products[]>();
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
  popularProducts(){
    return this.http.get<Products[]>("http://localhost:8000/products?_limit=4");
  }
  searchProducts(data : string){
    return this.http.get<Products[]>(`http://localhost:8000/products?q=${data}`);
  }
  fetchProduct(id:string){
    return this.http.get<Products>(`http://localhost:8000/products/${id}`);
  }
  cartItem(data : Products){
   let productdata = [];
   let localcart = localStorage.getItem('localcart');
   if(!localcart){
    localStorage.setItem('localcart' , JSON.stringify([data]));
   }
   else{
    productdata = JSON.parse(localcart);
    productdata.push(data);
    localStorage.setItem('localcart',JSON.stringify(productdata));
   }
   this.cartData.emit(productdata);
  }
}

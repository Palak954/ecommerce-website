import { HttpClient } from '@angular/common/http';
import { Injectable , EventEmitter} from '@angular/core';
import { Cart } from 'src/cart';
import { Order } from 'src/order';

import { Products } from 'src/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http : HttpClient) { }
  cartData = new EventEmitter<Products[] | []>();
  postProduct(data : Products){
    return this.http.post("http://localhost:8000/products" , data)
  }
  getProduct(){
    return this.http.get<Products[]>("http://localhost:8000/products");
  }
  deleteProduct(id:number){
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
    this.cartData.emit([data]);
   }
   else{
    productdata = JSON.parse(localcart);
    productdata.push(data);
    localStorage.setItem('localcart',JSON.stringify(productdata));
    this.cartData.emit(productdata);
   }
  }
  removeFromCart(productId : number){
    let cartData = localStorage.getItem('localcart');
    if(cartData){
      let items : Products[] = JSON.parse(cartData);
      let item  = items.filter((it : Products)=>{it.id !== productId});
      localStorage.setItem('localcart' , JSON.stringify(item));
      this.cartData.emit(item);
    }
  }
  StoreProductIncart(data : Cart){
    return this.http.post("http://localhost:8000/cart" , data);
  }
  getCartList(userId : number){
    return this.http.get<Products[]>(`http://localhost:8000/cart?userId=`+userId , {observe : 'response'})
    .subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body);
    }
    });
  }
  deleteCartListItem(cartId : number){
    return this.http.delete("http://localhost:8000/cart/" + cartId)
    };
    getCartItems(){
      let user = localStorage.getItem("user");
      let userId = JSON.parse(user).id;
      return this.http.get<Cart[]>("http://localhost:8000/cart?userId=" + userId);
    }
    removeToCart(id : number){
      return this.http.delete(`http://localhost:8000/cart/`+ id);
    }
    orderNow(data : Order){
      return this.http.post("http://localhost:8000/order" , data);
    }
    orderList(){
      let user = localStorage.getItem("user");
      let userId = user && JSON.parse(user).id;
      return this.http.get<Order[]>("http://localhost:8000/order?userId="+userId);
    }
    deleteCartItems(cartId : number){
      return this.http.delete(`http://localhost:8000/cart/`+ cartId).subscribe((result)=>{
        this.cartData.emit([]);
      });
    }
    removeOrder(id : number){
      return this.http.delete("http://localhost:8000/order/"+id);
    }
  }
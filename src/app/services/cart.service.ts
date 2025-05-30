import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   private cartItems: Product[] = [];
   private cartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.cartItems);
   constructor() { }

  addToCart(item: Product) {
    const existingProduct = this.cartItems.find(product => product.id === item.id);
    if(existingProduct)
    {
       existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    }
    else
    {
      
    this.cartItems.push({
      ...item,
      quantity:1
    });
    }
    this.cartSubject.next(this.cartItems);
  }

  getCartItems():Observable<Product[]> {
    console.log(this.cartItems);
     return this.cartSubject.asObservable();
  }

  removeItem(index: string) {
    
    this.cartItems=this.cartItems.filter(product=>{
      return product.id!=index;
    })
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}

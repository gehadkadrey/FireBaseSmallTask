import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../model/productModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private cartItems = new BehaviorSubject<ProductModel[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: ProductModel) {
    const currentItems = this.cartItems.value;
    console.log(currentItems);
    this.cartItems.next([...currentItems, product]);
    this.cartItems$.subscribe({
      next:(data:ProductModel[])=>{console.log(data)}
    })
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value.filter(item => item.id !== productId);
    this.cartItems.next(currentItems);
  }

  getCartItems() {
    return this.cartItems.value;
  }
}

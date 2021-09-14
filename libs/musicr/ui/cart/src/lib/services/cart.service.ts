import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  increaseItemAmount(index): void {
    this.cartItems$
      .pipe(
        map(cartItems => {
          cartItems[index].amount += 1;
        })
      )
      .subscribe();
  }

  decreaseItemAmount(index): void {
    this.cartItems$
      .pipe(
        map(cartItems => {
          cartItems[index].amount -= 1;
        })
      )
      .subscribe();
  }

  addItem(item): void {
    this.cartItems$
      .pipe(
        map(cartItems => {
          cartItems.push(item);
          console.log(cartItems);
          return cartItems;
        })
      )
      .subscribe();
  }

  removeItem(index): void {
    this.cartItems$
      .pipe(
        map(cartItems => {
          cartItems.splice(index, 1);
        })
      )
      .subscribe();
  }
}

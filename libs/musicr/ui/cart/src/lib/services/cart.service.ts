import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { OrderProduct } from '@musicr/domain';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemsSubject = new BehaviorSubject<OrderProduct[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  increaseItemAmount(index): void {
    this.cartItems$
      .pipe(
        take(1),
        map(cartItems => {
          cartItems[index].amount += 1;
          this.cartItemsSubject.next(cartItems);
        })
      )
      .subscribe();
  }

  decreaseItemAmount(index): void {
    this.cartItems$
      .pipe(
        take(1),
        tap(cartItems => {
          cartItems[index].amount -= 1;
          this.cartItemsSubject.next(cartItems);
        })
      )
      .subscribe();
  }

  addItem(item): void {
    this.cartItems$
      .pipe(
        take(1),
        tap(cartItems => {
          cartItems.push(item);
          this.cartItemsSubject.next(cartItems);
        })
      )
      .subscribe();
  }

  removeItem(index): void {
    this.cartItems$
      .pipe(
        take(1),
        tap(cartItems => {
          cartItems.splice(index, 1);
          this.cartItemsSubject.next(cartItems);
        })
      )
      .subscribe();
  }
}

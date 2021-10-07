import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeepPartial } from '@arphase/common';
import { Order, OrderProduct, SocialEvent } from '@musicr/domain';
import { BehaviorSubject, catchError, Observable, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItemsSubject = new BehaviorSubject<Partial<OrderProduct>[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  orderPreviewSubject = new BehaviorSubject<Order>(null);
  orderPreview$ = this.orderPreviewSubject.asObservable();
  socialEventSubject = new BehaviorSubject<SocialEvent>(null);
  socialEvent$ = this.socialEventSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cartItems$
      .pipe(switchMap(orderProducts => this.getOrderPreview({ orderProducts })))
      .subscribe(order => this.orderPreviewSubject.next(order));
  }

  getOrderPreview(order: DeepPartial<Order>): Observable<Order> {
    return this.http.post<Order>(`/mrlApi/orders/preview`, order).pipe(catchError(() => this.orderPreview$));
  }

  increaseItemAmount(index: number): void {
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      cartItems[index].amount += 1;
      this.cartItemsSubject.next(cartItems);
    });
  }

  decreaseItemAmount(index: number): void {
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      cartItems[index].amount -= 1;
      this.cartItemsSubject.next(cartItems);
    });
  }

  addItem(item: Partial<OrderProduct>): void {
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      cartItems.push(item);
      this.cartItemsSubject.next(cartItems);
    });
  }

  removeItem(index: number): void {
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      cartItems.splice(index, 1);
      this.cartItemsSubject.next(cartItems);
    });
  }

  saveSocialEvent(socialEvent: SocialEvent): void {
    this.socialEventSubject.next(socialEvent);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeepPartial } from '@arphase/common';
import { GtagService } from '@arphase/ui/gtag';
import { Customer, Order, OrderProduct, OrderTypes, SocialEvent } from '@musicr/domain';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItemsSubject = new BehaviorSubject<Partial<OrderProduct>[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  orderPreviewSubject = new BehaviorSubject<Order>(null);
  orderPreview$ = this.orderPreviewSubject.asObservable();
  socialEventSubject = new BehaviorSubject<SocialEvent>(null);
  socialEvent$ = this.socialEventSubject.asObservable();
  personalDataSubject = new BehaviorSubject<Customer>(null);
  personalData$ = this.personalDataSubject.asObservable();
  currentCustomerSubject = new BehaviorSubject<Customer>(null);
  currentCustomer$ = this.currentCustomerSubject.asObservable();
  orderSubject = new BehaviorSubject<Order>(null);
  order$ = this.orderSubject.asObservable();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  orderType$ = this.route.queryParams.pipe(
    filter(queryParams => !!queryParams),
    map(({ orderType }) => orderType)
  );
  listenToCartItemsSubscription: Subscription;

  constructor(private http: HttpClient, private gtagService: GtagService, private route: ActivatedRoute) {}

  listenToCartItemsChange(): void {
    this.gtagService.event('begin_checkout');
    if (this.listenToCartItemsSubscription) {
      this.listenToCartItemsSubscription.unsubscribe();
    }
    this.listenToCartItemsSubscription = this.cartItems$
      .pipe(switchMap(orderProducts => this.getOrderPreview({ orderProducts })))
      .subscribe(order => this.orderPreviewSubject.next(order));
  }

  getOrderPreview(order: DeepPartial<Order>): Observable<Order> {
    return this.http.post<Order>(`/mrlApi/orders/preview`, order).pipe(catchError(() => this.orderPreview$));
  }

  getCustomerByEmail(email: string): void {
    const params = new HttpParams({ fromObject: { email } });
    this.http
      .get<Customer>(`/mrlApi/customers/search/email`, { params })
      .pipe(take(1))
      .subscribe(customer => this.currentCustomerSubject.next(customer));
  }

  increaseItemAmount(index: number): void {
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      cartItems[index].amount += 1;
      this.cartItemsSubject.next(cartItems);
    });
  }

  decreaseItemAmount(index: number): void {
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      if (cartItems[index].amount > 1) {
        cartItems[index].amount -= 1;
        this.cartItemsSubject.next(cartItems);
      }
    });
  }

  addItem(item: Partial<OrderProduct>): void {
    this.gtagService.event('add_to_cart', {
      items: [
        {
          currency: 'MXN',
          item_id: String(item.product.id),
          item_name: item.product.name,
          item_category: item.product.subcategory.category.name,
          item_category2: item.product.subcategory.name,
          price: item.price,
          quantity: item.amount,
        },
      ],
    });
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      cartItems.push(item);
      this.cartItemsSubject.next(cartItems);
    });
  }

  removeItem(index: number): void {
    this.cartItems$.pipe(take(1)).subscribe(cartItems => {
      const [item] = cartItems.splice(index, 1);
      this.gtagService.event('remove_from_cart', {
        items: [
          {
            currency: 'MXN',
            item_id: String(item.product.id),
            item_name: item.product.name,
            item_category: item.product.subcategory.category.name,
            item_category2: item.product.subcategory.name,
            price: item.price,
            quantity: item.amount,
          },
        ],
      });
      this.cartItemsSubject.next(cartItems);
    });
  }

  saveSocialEvent(socialEvent: SocialEvent): void {
    this.socialEventSubject.next(socialEvent);
  }

  createOrder(customer: Customer): void {
    this.loadingSubject.next(true);
    this.personalDataSubject.next(customer);
    combineLatest([this.cartItems$, this.socialEvent$, this.orderType$])
      .pipe(
        switchMap(([orderProducts, socialEvent, orderType]) =>
          this.http.post<Order>(orderType === OrderTypes.purchase ? `/mrlApi/orders` : `/mrlApi/orders/quote`, {
            orderProducts,
            socialEvent,
            customer,
            orderType,
          })
        ),
        take(1),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(order => {
        this.gtagService.event('purchase', {
          transaction_id: String(order.id),
          value: order.total,
          currency: 'MXN',
          items: order.orderProducts.map(orderProduct => ({
            currency: 'MXN',
            item_id: String(orderProduct.product.id),
            item_name: orderProduct.product.name,
            item_category: orderProduct.product.subcategory.category.name,
            item_category2: orderProduct.product.subcategory.name,
            price: orderProduct.price,
            quantity: orderProduct.amount,
          })),
        });
        this.orderSubject.next(order);
      });
  }
}

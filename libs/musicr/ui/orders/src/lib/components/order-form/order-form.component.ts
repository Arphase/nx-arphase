import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Address } from '@arphase/common';
import { ApsFormComponent, ControlsOf } from '@arphase/ui/core';
import {
  Customer,
  eventPlaceOptions,
  Order,
  OrderProduct,
  orderTypeOptions,
  Product,
  SocialEvent,
} from '@musicr/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, debounceTime, startWith, Subject } from 'rxjs';
import { v4 } from 'uuid';

import { createOrderProductForm } from './order-form.constants';

@UntilDestroy()
@Component({
  selector: 'mrl-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent extends ApsFormComponent<Order> implements OnInit, OnChanges {
  @Input() productsData: Record<number, Product> = {};
  @Input() currentCustomer: Customer;
  eventPlaceOptions = eventPlaceOptions;
  orderTypeOptions = orderTypeOptions;
  productsDataChangesSubject = new Subject<string>();
  @Output() getProductData = new EventEmitter<number>();
  @Output() emailChanges = new EventEmitter<string>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.orderProductsFormArray.controls.length) {
      this.addProduct();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentCustomer && this.form) {
      this.customerForm.get('id').patchValue(this.currentCustomer?.id ?? null);
    }

    if (changes.form && this.form) {
      this.customerForm
        .get('email')
        .valueChanges.pipe(debounceTime(1000), untilDestroyed(this))
        .subscribe(value => this.emailChanges.emit(value));
    }

    if (changes.item && this.item?.id) {
      this.form.patchValue(this.item);
      this.item.orderProducts.forEach(orderProduct =>
        this.addProduct({
          ...orderProduct,
          orderProductAdditionalOptions: orderProduct.orderProductAdditionalOptions.map(additionalOption => ({
            ...additionalOption,
            selected: true,
          })),
        })
      );
    }

    if (changes.productsData && this.productsData) {
      this.productsDataChangesSubject.next(v4());
    }
  }

  get orderProductsFormArray(): FormArray<FormGroup<ControlsOf<OrderProduct>>> {
    return this.form.get('orderProducts') as FormArray<FormGroup<ControlsOf<OrderProduct>>>;
  }

  get socialEventForm(): FormGroup<ControlsOf<SocialEvent>> {
    return this.form.get('socialEvent') as FormGroup<ControlsOf<SocialEvent>>;
  }

  get addressForm(): FormGroup<ControlsOf<Address>> {
    return this.socialEventForm.get('address') as FormGroup<ControlsOf<Address>>;
  }

  get customerForm(): FormGroup<ControlsOf<Customer>> {
    return this.form.get('customer') as FormGroup<ControlsOf<Customer>>;
  }

  addProduct(orderProduct?: OrderProduct): void {
    const form = createOrderProductForm(orderProduct) as FormGroup<ControlsOf<OrderProduct>>;

    form
      .get('productId')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(value => {
        this.getProductData.emit(value);
        form.patchValue({ amount: 0, priceOptionId: null });
      });

    combineLatest([
      form.get('amount').valueChanges.pipe(startWith(form.get('amount').value)),
      form.get('priceOptionId').valueChanges.pipe(startWith(form.get('priceOptionId').value)),
      form
        .get('orderProductAdditionalOptions')
        .valueChanges.pipe(startWith(form.get('orderProductAdditionalOptions').value)),
      this.productsDataChangesSubject,
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([amount, priceOptionId, orderProductAdditionalOptions]) => {
        const productId = form.get('productId').value;
        const productPrice = priceOptionId
          ? this.productsData[productId]?.priceOptions.find(priceOption => priceOption.id === priceOptionId)?.price
          : this.productsData[productId]?.price;
        const priceArray = orderProductAdditionalOptions
          .filter(({ selected }) => selected)
          .map(({ additionalOption }) => additionalOption.price);
        const additionalProductsPrice = priceArray.length ? priceArray.reduce((a, b) => a + b) : 0;
        const totalPrice = (productPrice + additionalProductsPrice) * amount;
        form.get('price').patchValue(totalPrice);
      });

    this.orderProductsFormArray.push(form);

    if (orderProduct) {
      const { productId } = orderProduct;
      this.getProductData.emit(productId);
    }
  }

  removeProduct(index: number): void {
    this.orderProductsFormArray.removeAt(index);
  }

  transformFromForm(values: Order): Order {
    return {
      ...values,
      orderProducts: values.orderProducts.map(orderProduct => ({
        ...orderProduct,
        orderProductAdditionalOptions: orderProduct.orderProductAdditionalOptions.filter(
          additionalOption => additionalOption.selected
        ),
      })),
    };
  }
}

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
import { combineLatest, debounceTime, startWith } from 'rxjs';

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
  @Output() getProductData = new EventEmitter<number>();
  @Output() emailChanges = new EventEmitter<string>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.addProduct();
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

  addProduct(): void {
    const form = createOrderProductForm() as FormGroup<ControlsOf<OrderProduct>>;

    form
      .get('productId')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => form.patchValue({ amount: 0, priceOptionId: null }));

    combineLatest([
      form.get('amount').valueChanges.pipe(startWith(form.get('amount').value)),
      form.get('priceOptionId').valueChanges.pipe(startWith(form.get('priceOptionId').value)),
      form
        .get('orderProductAdditionalOptions')
        .valueChanges.pipe(startWith(form.get('orderProductAdditionalOptions').value)),
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

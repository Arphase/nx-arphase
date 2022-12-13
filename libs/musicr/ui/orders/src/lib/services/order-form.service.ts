import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ControlsOf, setFormArrayValue } from '@arphase/ui/forms';
import { mapToSelectOptionsSync } from '@arphase/ui/utils';
import { Customer, Order, OrderProduct, OrderProductAdditionalOption, Product } from '@musicr/domain';
import { ProductDataService } from '@musicr/ui/products/data';
import { BehaviorSubject, take } from 'rxjs';

import {
  createAdditionalOptionForm,
  createOrderForm,
  OrderFormProduct,
} from '../components/order-form/order-form.constants';

@Injectable()
export class OrderFormService {
  form: FormGroup<ControlsOf<Order>> = createOrderForm();
  productsDataSubject = new BehaviorSubject<Record<number, OrderFormProduct>>({});
  productsData$ = this.productsDataSubject.asObservable();
  currentCustomerSubject = new BehaviorSubject<Customer>(null);
  currentCustomer$ = this.currentCustomerSubject.asObservable();

  get orderProductsFormArray(): FormArray<FormGroup<ControlsOf<OrderProduct>>> {
    return this.form.get('orderProducts') as FormArray<FormGroup<ControlsOf<OrderProduct>>>;
  }

  constructor(private http: HttpClient, private productDataService: ProductDataService) {}

  getProductData(productId: number): void {
    if (!this.productsDataSubject.value[productId]) {
      this.productDataService
        .getById(productId)
        .pipe(take(1))
        .subscribe(product => {
          this.productsDataSubject.next({
            ...this.productsDataSubject.value,
            [productId]: {
              ...product,
              selectablePriceOptions: mapToSelectOptionsSync(product.priceOptions, priceOption => ({
                label: priceOption.name,
                value: priceOption.id,
              })),
            },
          });
          this.updateFormControls(product);
        });
    } else {
      this.updateFormControls(this.productsDataSubject.value[productId]);
    }
  }

  updateFormControls(product: Product): void {
    this.orderProductsFormArray.controls
      .filter(control => control.value.productId === product.id)
      .forEach(control => {
        const additionalOptionsControl = control.get('orderProductAdditionalOptions') as FormArray<
          FormGroup<ControlsOf<OrderProductAdditionalOption>>
        >;
        const selectedAdditionalOptions = additionalOptionsControl.value.filter(({ selected }) => selected);

        setFormArrayValue(additionalOptionsControl, product.additionalOptions, additionalOption => {
          const { name, price, id } = additionalOption;
          return createAdditionalOptionForm({
            id: selectedAdditionalOptions.find(({ additionalOptionId }) => additionalOptionId === id)?.id,
            selected: !!selectedAdditionalOptions.find(({ additionalOptionId }) => additionalOptionId === id),
            additionalOptionId: id,
            additionalOption: { name, price },
          });
        });
      });
  }

  getCustomerByEmail(email: string): void {
    const params = new HttpParams({ fromObject: { email } });
    this.http
      .get<Customer>(`/mrlApi/customers/search/email`, { params })
      .pipe(take(1))
      .subscribe(customer => this.currentCustomerSubject.next(customer));
  }
}

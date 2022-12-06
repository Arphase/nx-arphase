import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DeepPartial } from '@arphase/common';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsValidators } from '@arphase/ui/core';
import { OrderProductAdditionalOption, Product } from '@musicr/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export interface OrderFormProduct extends Product {
  selectablePriceOptions: NzSelectOptionInterface[];
}

export function createOrderForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    orderType: new FormControl(null, ApsValidators.required),
    orderProducts: new FormArray([]),
    socialEvent: new FormGroup({
      id: new FormControl(null),
      eventType: new FormControl(null, ApsValidators.required),
      date: new FormControl(null, ApsValidators.required),
      startTime: new FormControl(null, ApsValidators.required),
      endTime: new FormControl(null, ApsValidators.required),
      eventPlace: new FormControl(null, ApsValidators.required),
      notes: new FormControl(null),
      requiresAssembly: new FormControl(false),
      address: createAddressForm(),
    }),
    customer: new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, ApsValidators.required),
      lastName: new FormControl(null, ApsValidators.required),
      email: new FormControl(null, [ApsValidators.required, ApsValidators.email]),
      phone: new FormControl(null, ApsValidators.required),
    }),
  });
}

export function createOrderProductForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    price: new FormControl(0),
    productId: new FormControl(null, ApsValidators.required),
    amount: new FormControl(null, ApsValidators.required),
    priceOptionId: new FormControl(null),
    orderProductAdditionalOptions: new FormArray([]),
  });
}

export function createAdditionalOptionForm(option: DeepPartial<OrderProductAdditionalOption>): FormGroup {
  const form = new FormGroup({
    selected: new FormControl(false),
    id: new FormControl(option.id),
    additionalOptionId: new FormControl(option.additionalOptionId),
    additionalOption: new FormGroup({
      name: new FormControl(option.additionalOption.name),
      price: new FormControl(option.additionalOption.price),
    }),
  });

  return form;
}

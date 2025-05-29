import { FormArray, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { DeepPartial } from '@arphase/common';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsValidators, ControlsOf, setFormArrayValue } from '@arphase/ui/forms';
import { Order, OrderProduct, OrderProductAdditionalOption, Product } from '@musicr/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export interface OrderFormProduct extends Product {
  selectablePriceOptions: NzSelectOptionInterface[];
}

export function createOrderForm(): FormGroup<ControlsOf<Partial<Order>>> {
  return new UntypedFormGroup({
    id: new FormControl(null),
    orderType: new FormControl(null, ApsValidators.required),
    orderProducts: new FormArray([]),
    total: new FormControl<number>(0),
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

export function createOrderProductForm(orderProduct?: OrderProduct): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    price: new FormControl(0),
    productId: new FormControl(null, ApsValidators.required),
    amount: new FormControl(null, [ApsValidators.required, ApsValidators.min(1)]),
    priceOptionId: new FormControl(null),
    orderProductAdditionalOptions: new FormArray([]),
  });
  if (orderProduct) {
    form.patchValue(orderProduct);
    setFormArrayValue(
      form.get('orderProductAdditionalOptions') as FormArray,
      orderProduct.orderProductAdditionalOptions,
      additionalOption => createAdditionalOptionForm(additionalOption),
    );
  }
  return form;
}

export function createAdditionalOptionForm(option: DeepPartial<OrderProductAdditionalOption>): FormGroup {
  const form = new FormGroup({
    selected: new FormControl(option.selected ?? false),
    id: new FormControl(option.id),
    price: new FormControl<number>(option.price),
    additionalOptionId: new FormControl(option.additionalOptionId),
    additionalOption: new FormGroup({
      name: new FormControl(option.additionalOption.name),
      price: new FormControl(option.additionalOption.price),
    }),
  });

  return form;
}

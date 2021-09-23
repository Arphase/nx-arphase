import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui/core';
import { AdditionalProduct, Reservation, ReservationAdditionalProduct } from '@valmira/domain';
import { keyBy } from 'lodash';

export function createAdditionalProductForm(
  item: AdditionalProduct,
  currentReservationProducts: Record<number, ReservationAdditionalProduct>
): FormGroup {
  const reservationItem = currentReservationProducts[item.id];
  return new FormGroup({
    id: new FormControl(reservationItem?.id || null),
    active: new FormControl(!!reservationItem || false),
    amount: new FormControl(reservationItem?.amount || 1),
    additionalProductId: new FormControl(item.id),
    name: new FormControl(item.name),
    price: new FormControl(item.price),
  });
}

@Component({
  selector: 'vma-additional-services',
  templateUrl: './additional-services.component.html',
  styleUrls: ['./additional-services.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServicesComponent extends ApsFormComponent<Reservation> implements OnChanges {
  @Input() items: AdditionalProduct[];
  form = new FormGroup({
    id: new FormControl(null),
    additionalProducts: new FormArray([]),
  });

  get additionalProductsFormArray(): FormArray {
    return this.form.get('additionalProducts') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.item || changes.items) && this.item?.id && this.items?.length) {
      this.additionalProductsFormArray.clear();
      this.form.get('id').patchValue(this.item.id);
      const currentReservationProducts: Record<number, ReservationAdditionalProduct> = keyBy(
        this.item.additionalProducts,
        'additionalProductId'
      );
      this.items.forEach(item =>
        this.additionalProductsFormArray.push(createAdditionalProductForm(item, currentReservationProducts))
      );
    }
  }

  subtract(form: FormGroup): void {
    const amountControl = form.get('amount');
    if (Number(amountControl.value) > 0) {
      amountControl.patchValue(Number(amountControl.value) - 1);
    }
  }

  add(form: FormGroup): void {
    const amountControl = form.get('amount');
    amountControl.patchValue((Number(amountControl.value) || 0) + 1);
  }

  transformFromForm(values: Reservation): Reservation {
    return {
      ...values,
      additionalProducts: values.additionalProducts
        .filter(product => product.active || (!product.active && product.id))
        .map(product => ({ ...product, destroy: !product.active })),
    };
  }
}

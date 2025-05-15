import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui/forms';
import { AdditionalProduct, Reservation, ReservationAdditionalProduct } from '@valmira/domain';
import { keyBy } from 'lodash';

export function createAdditionalProductForm(
  item: AdditionalProduct,
  currentReservationProducts: Record<number, ReservationAdditionalProduct>
): UntypedFormGroup {
  const reservationItem = currentReservationProducts[item.id];
  return new UntypedFormGroup({
    id: new UntypedFormControl(reservationItem?.id || null),
    active: new UntypedFormControl(!!reservationItem || false),
    amount: new UntypedFormControl(reservationItem?.amount || 1),
    additionalProductId: new UntypedFormControl(item.id),
    name: new UntypedFormControl(item.name),
    price: new UntypedFormControl(item.price),
  });
}

@Component({
    selector: 'vma-additional-services',
    templateUrl: './additional-services.component.html',
    styleUrls: ['./additional-services.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AdditionalServicesComponent extends ApsFormComponent<Reservation> implements OnChanges {
  @Input() items: AdditionalProduct[];
  form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    additionalProducts: new UntypedFormArray([]),
  });

  get additionalProductsFormArray(): UntypedFormArray {
    return this.form.get('additionalProducts') as UntypedFormArray;
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

  subtract(form: UntypedFormGroup): void {
    const amountControl = form.get('amount');
    if (Number(amountControl.value) > 0) {
      amountControl.patchValue(Number(amountControl.value) - 1);
    }
  }

  add(form: UntypedFormGroup): void {
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

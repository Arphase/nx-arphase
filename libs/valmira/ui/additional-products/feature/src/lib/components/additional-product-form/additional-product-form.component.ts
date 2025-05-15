import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/forms';
import { AdditionalProduct } from '@valmira/domain';

export function createAdditionalProductForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, ApsValidators.required),
    description: new UntypedFormControl(null, ApsValidators.required),
    price: new UntypedFormControl(null, ApsValidators.required),
  });
}

@Component({
    selector: 'vma-additional-product-form',
    templateUrl: './additional-product-form.component.html',
    styleUrls: ['./additional-product-form.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AdditionalProductFormComponent extends ApsFormComponent<AdditionalProduct> implements OnChanges {
  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }
}

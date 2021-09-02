import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { AdditionalProduct } from '@valmira/domain';

export function createAdditionalProductForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    description: new FormControl(null, ApsValidators.required),
    price: new FormControl(null, ApsValidators.required),
  });
}

@Component({
  selector: 'vma-additional-product-form',
  templateUrl: './additional-product-form.component.html',
  styleUrls: ['./additional-product-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalProductFormComponent extends ApsFormComponent<AdditionalProduct> implements OnChanges {
  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }
}

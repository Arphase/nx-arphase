import { ChangeDetectionStrategy, Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators, filterNil, setFormArrayValue } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs';

export function createProductForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    price: new FormControl(null, ApsValidators.required),
    description: new FormControl(null),
    disclaimer: new FormControl(null),
    categoryId: new FormControl(null, ApsValidators.required),
    subcategoryId: new FormControl(null, ApsValidators.required),
    productComponents: new FormArray([]),
    additionalOptions: new FormArray([]),
  });
}

@UntilDestroy()
@Component({
  selector: 'mrl-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent extends ApsFormComponent<Product> implements OnChanges {
  form = createProductForm();
  @Output() categoryChanges = new EventEmitter<number>();

  get productComponentsFormArray(): FormArray {
    return this.form?.get('productComponents') as FormArray;
  }

  get additionalOptionsFormArray(): FormArray {
    return this.form?.get('additionalOptions') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
      setFormArrayValue(this.productComponentsFormArray, this.item.productComponents);
    }

    if (changes.form && this.form) {
      this.form
        .get('categoryId')
        .valueChanges.pipe(untilDestroyed(this), filterNil(), distinctUntilChanged())
        .subscribe(value => {
          this.categoryChanges.emit(Number(value));
          this.form.get('subcategoryId').patchValue(null, { emitEvent: false });
        });
    }
  }

  addComponent(): void {
    this.productComponentsFormArray.push(new FormControl('', ApsValidators.required));
  }

  removeComponent(index: number): void {
    this.productComponentsFormArray.removeAt(index);
  }
}

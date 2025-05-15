import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DeepPartial, moveItemInArray } from '@arphase/common';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/forms';
import { Product, Subcategory } from '@musicr/domain';

export function createSubcategoryForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, ApsValidators.required),
    description: new UntypedFormControl(null, ApsValidators.required),
    categoryId: new UntypedFormControl(null, ApsValidators.required),
  });
}

@Component({
    selector: 'mrl-subcategory-form',
    templateUrl: './subcategory-form.component.html',
    styleUrls: ['./subcategory-form.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SubcategoryFormComponent extends ApsFormComponent<DeepPartial<Subcategory>> implements OnChanges {
  products: DeepPartial<Product>[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.products = this.item.products;
      this.form.patchValue(this.item);
    }
  }

  productMoved(event: CdkDragDrop<Product[]>): void {
    this.products = moveItemInArray(this.products, event.previousIndex, event.currentIndex);
  }

  transformFromForm(values: DeepPartial<Subcategory>): DeepPartial<Subcategory> {
    return {
      ...values,
      products: this.products.map(({ id }, index) => ({ id, position: index })),
    };
  }
}

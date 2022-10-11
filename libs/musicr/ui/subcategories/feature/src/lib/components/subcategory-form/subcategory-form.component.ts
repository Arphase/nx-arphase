import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { Subcategory } from '@musicr/domain';

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
})
export class SubcategoryFormComponent extends ApsFormComponent<Subcategory> implements OnChanges {
  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }
}

import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { Subcategory } from '@musicr/domain';

export function createSubcategoryForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    description: new FormControl(null, ApsValidators.required),
    categoryId: new FormControl(null, ApsValidators.required),
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

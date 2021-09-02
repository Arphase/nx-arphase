import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { Category } from '@musicr/domain';

export function createCategoryForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    description: new FormControl(null, ApsValidators.required),
  });
}

@Component({
  selector: 'mrl-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent extends ApsFormComponent<Category> implements OnChanges {
  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }
}

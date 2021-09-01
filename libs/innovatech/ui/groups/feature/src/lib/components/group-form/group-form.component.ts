import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Group } from '@innovatech/common/domain';
import { ApsFormComponent } from '@arphase/ui/core';

import { patchGroupForm } from '../../functions/group-form.functions';

@Component({
  selector: 'ivt-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormComponent extends ApsFormComponent<Group> implements OnChanges {
  get companiesFormArray(): FormArray {
    return this.form.get('companies') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      patchGroupForm(this.form, this.item);
    }
  }
}

import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui/forms';
import { Group } from '@innovatech/common/domain';

import { patchGroupForm } from '../../functions/group-form.functions';

@Component({
  selector: 'ivt-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormComponent extends ApsFormComponent<Group, Group> implements OnChanges {
  get companiesFormArray(): UntypedFormArray {
    return this.form.get('companies') as UntypedFormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      patchGroupForm(this.form, this.item);
    }
  }
}

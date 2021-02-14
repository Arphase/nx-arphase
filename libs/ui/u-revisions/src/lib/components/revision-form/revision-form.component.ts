import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsValidators } from '@arphase/ui';
import { Revision, RevisionStatus, Select } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

export function createRevisionForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    observations: new FormControl(null, ApsValidators.required),
    status: new FormControl(null, ApsValidators.required),
  });
}

@Component({
  selector: 'ivt-revision-form',
  templateUrl: './revision-form.component.html',
  styleUrls: ['./revision-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionFormComponent extends IvtFormComponent<Revision> implements OnChanges {
  statusOptions: Select[] = [
    {
      label: 'En buenas condiciones',
      value: RevisionStatus[RevisionStatus.elegible],
    },
    {
      label: 'Necesita reparaciones',
      value: RevisionStatus[RevisionStatus.needsRepairs],
    },
    {
      label: 'No apto para garantizar',
      value: RevisionStatus[RevisionStatus.notElegible],
    },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }
}

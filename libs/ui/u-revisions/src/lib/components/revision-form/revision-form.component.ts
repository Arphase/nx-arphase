import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Revision, RevisionStatus, Select } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

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
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      observations: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }
}
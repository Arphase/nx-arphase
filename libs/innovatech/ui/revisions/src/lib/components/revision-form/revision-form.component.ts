import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsValidators } from '@arphase/ui/core';
import { Revision, RevisionReportItems, Vehicle } from '@innovatech/common/domain';
import { createVehicleForm } from '@innovatech/ui/vehicles/ui';
import { ApsFormComponent } from '@arphase/ui/core';

import { iconMap, reportLabels, revisionReportSections, statusOptions } from './revision-form.constants';

export function createRevisionForm(): FormGroup {
  const report = {};
  Object.keys(RevisionReportItems)
    .filter(key => /^\d+$/.test(key))
    .forEach(key => (report[key] = new FormControl('')));
  return new FormGroup({
    id: new FormControl(null),
    report: new FormGroup(report),
    observations: new FormControl(null, ApsValidators.required),
    status: new FormControl(null, ApsValidators.required),
    kilometrage: new FormControl(null, ApsValidators.required),
    reviewdBy: new FormControl(null, ApsValidators.required),
    vehicle: createVehicleForm(),
  });
}

@Component({
  selector: 'ivt-revision-form',
  templateUrl: './revision-form.component.html',
  styleUrls: ['./revision-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionFormComponent extends ApsFormComponent<Revision> implements OnChanges, AfterViewInit {
  @Input() vehicle: Vehicle;
  @Input() currentVehicle: Vehicle;
  @Input() error: string;
  statusOptions = statusOptions;
  revisionReportSections = revisionReportSections;
  reportLabels = reportLabels;
  iconMap = iconMap;
  form = createRevisionForm();
  @Output() verifyVin = new EventEmitter<string>();

  get vehicleForm(): FormGroup {
    return this.form.get('vehicle') as FormGroup;
  }

  get reportForm(): FormGroup {
    return this.form.get('report') as FormGroup;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isEditable) {
      this.isEditable ? this.form.enable({ emitEvent: false }) : this.form.disable({ emitEvent: false });
    }
  }

  ngAfterViewInit() {
    if (this.item) {
      this.form.patchValue(this.item);
    }
  }
}

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
import { ApsValidators } from '@arphase/ui';
import { Revision, RevisionStatus, Select, Vehicle } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { createVehicleForm } from '@ivt/u-vehicles';

export function createRevisionForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    observations: new FormControl(null, ApsValidators.required),
    status: new FormControl(null, ApsValidators.required),
    vehicle: createVehicleForm(),
  });
}

@Component({
  selector: 'ivt-revision-form',
  templateUrl: './revision-form.component.html',
  styleUrls: ['./revision-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionFormComponent extends IvtFormComponent<Revision> implements OnChanges, AfterViewInit {
  @Input() vehicle: Vehicle;
  @Input() currentVehicle: Vehicle;
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
  @Output() verifyVin = new EventEmitter<string>();

  get vehicleForm(): FormGroup {
    return this.form.get('vehicle') as FormGroup;
  }

  get showVehicleAlert(): boolean {
    return !this.currentVehicle && !this.vehicle && this.vehicleForm.get('vin').valid && this.isEditable;
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

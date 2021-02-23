import {
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
import { Select, Vehicle, VEHICLE_VIN_LENGTH } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { omit } from 'lodash-es';
import { filter, takeUntil } from 'rxjs/operators';

export function createVehicleForm(vehicle?: Vehicle) {
  const todayYear = new Date().getFullYear();

  const form = new FormGroup({
    id: new FormControl(null),
    brand: new FormControl('', ApsValidators.required),
    model: new FormControl('', ApsValidators.required),
    version: new FormControl('', ApsValidators.required),
    year: new FormControl('', [
      ApsValidators.requiredNumber,
      ApsValidators.min(todayYear - 20),
      ApsValidators.max(todayYear + 1),
    ]),
    vin: new FormControl('', [
      ApsValidators.required,
      ApsValidators.minLength(VEHICLE_VIN_LENGTH),
      ApsValidators.maxLength(VEHICLE_VIN_LENGTH),
    ]),
    motorNumber: new FormControl('', ApsValidators.required),
    horsePower: new FormControl('', [ApsValidators.requiredNumber, ApsValidators.min(1), ApsValidators.max(400)]),
    companyId: new FormControl(null, ApsValidators.required),
  });

  if (vehicle) {
    form.patchValue(vehicle);
  }

  return form;
}

@Component({
  selector: 'ivt-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormComponent extends IvtFormComponent<Vehicle> implements OnChanges {
  @Input() companyId: number;
  @Input() showCompanyInput: boolean;
  @Input() companyOptions: Select[] = [];
  @Input() vehicle: Vehicle;
  @Output() verifyVin = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.companyId) {
      this.form.get('companyId').patchValue(this.companyId || '');
    }

    if (changes.form && this.form) {
      this.form
        .get('vin')
        .valueChanges.pipe(
          filter((vin: string) => vin.length === VEHICLE_VIN_LENGTH),
          takeUntil(this.destroy$)
        )
        .subscribe(vin => this.verifyVin.emit(vin));
    }

    if (changes.showCompanyInput) {
      this.showCompanyInput
        ? this.form.get('companyId').enable({ emitEvent: false })
        : this.form.get('companyId').disable({ emitEvent: false });
    }

    if (changes.item && this.item) {
      this.form.patchValue(this.item, { emitEvent: false });
      this.form.disable({ emitEvent: false });
      this.form.get('vin').enable({ emitEvent: false });
    }

    if (changes.vehicle && this.isEditable) {
      if (this.vehicle) {
        this.form.patchValue(omit(this.vehicle, 'vin'));
        this.form.disable({ emitEvent: false });
        this.form.get('vin').enable({ emitEvent: false });
      } else {
        this.form.enable({ emitEvent: false });
        this.form.get('id').patchValue(null);
      }
    }

    if (changes.isEditable) {
      this.isEditable ? this.form.enable({ emitEvent: false }) : this.form.disable({ emitEvent: false });
    }
  }
}

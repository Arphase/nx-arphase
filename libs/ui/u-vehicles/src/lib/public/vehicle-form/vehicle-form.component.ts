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
  }
}

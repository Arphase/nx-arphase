import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApsValidators } from '@arphase/ui/forms';
import { Vehicle, VEHICLE_VIN_LENGTH } from '@innovatech/common/domain';
import { ApsFormComponent } from '@arphase/ui/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParams } from '@ngrx/data';
import { omit } from 'lodash';
import { filter } from 'rxjs/operators';

export function createVehicleForm(vehicle?: Vehicle) {
  const todayYear = new Date().getFullYear();

  const form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    brand: new UntypedFormControl(null, ApsValidators.required),
    model: new UntypedFormControl(null, ApsValidators.required),
    version: new UntypedFormControl(null),
    year: new UntypedFormControl(null, [ApsValidators.min(todayYear - 20), ApsValidators.max(todayYear + 1)]),
    vin: new UntypedFormControl(null, [
      ApsValidators.required,
      ApsValidators.minLength(VEHICLE_VIN_LENGTH),
      ApsValidators.maxLength(VEHICLE_VIN_LENGTH),
    ]),
    motorNumber: new UntypedFormControl(null),
    horsePower: new UntypedFormControl(null, [ApsValidators.min(1), ApsValidators.max(500)]),
    companyId: new UntypedFormControl(null, ApsValidators.required),
  });

  if (vehicle) {
    form.patchValue(vehicle);
  }

  return form;
}

@UntilDestroy()
@Component({
  selector: 'ivt-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormComponent extends ApsFormComponent<Vehicle> implements OnChanges {
  @Input() companyId: number;
  @Input() showCompanyInput: boolean;
  @Input() vehicle: Vehicle;
  form = createVehicleForm();
  @Output() verifyVin = new EventEmitter<string>();
  @Output() getCompanies = new EventEmitter<QueryParams>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.companyId) {
      this.form.get('companyId').patchValue(this.companyId || '');
    }

    if (changes.form && this.form) {
      this.form
        .get('vin')
        .valueChanges.pipe(
          filter((vin: string) => vin.length === VEHICLE_VIN_LENGTH),
          untilDestroyed(this)
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

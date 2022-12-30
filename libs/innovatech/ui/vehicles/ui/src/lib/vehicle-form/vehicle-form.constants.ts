import { FormControl, FormGroup } from '@angular/forms';
import { ApsValidators, ControlsOf } from '@arphase/ui/forms';
import { Vehicle, VEHICLE_VIN_LENGTH } from '@innovatech/common/domain';

export function createVehicleForm(vehicle?: Vehicle): FormGroup<ControlsOf<Partial<Vehicle>>> {
  const todayYear = new Date().getFullYear();

  const form = new FormGroup<ControlsOf<Partial<Vehicle>>>({
    id: new FormControl(null),
    brand: new FormControl(null, ApsValidators.required),
    model: new FormControl(null, ApsValidators.required),
    version: new FormControl(null),
    year: new FormControl(null, [ApsValidators.min(todayYear - 20), ApsValidators.max(todayYear + 1)]),
    vin: new FormControl(null, [
      ApsValidators.required,
      ApsValidators.minLength(VEHICLE_VIN_LENGTH),
      ApsValidators.maxLength(VEHICLE_VIN_LENGTH),
    ]),
    motorNumber: new FormControl(null),
    horsePower: new FormControl(null, [ApsValidators.min(1), ApsValidators.max(500)]),
    companyId: new FormControl(null, ApsValidators.required),
  });

  if (vehicle) {
    form.patchValue(vehicle);
  }

  return form;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

export function createVehicleForm(vehicle?: Vehicle) {
  const todayYear = new Date().getFullYear();

  const form = new FormGroup({
    id: new FormControl(null),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required, Validators.min(todayYear - 20), Validators.max(todayYear + 1)]),
    vin: new FormControl('', Validators.required),
    motorNumber: new FormControl('', Validators.required),
    horsePower: new FormControl('', [Validators.required, Validators.max(400)]),
  });

  if (vehicle) {
    form.patchValue(vehicle);
  }

  return form;
}

@Component({
  selector: 'ivt-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormComponent extends IvtFormComponent<Vehicle> {}

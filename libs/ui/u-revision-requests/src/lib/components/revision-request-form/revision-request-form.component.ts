import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsValidators } from '@arphase/ui';
import { RevisionRequest, Vehicle } from '@ivt/c-data';
import { createAddressForm, IvtFormComponent } from '@ivt/u-ui';
import { createVehicleForm } from '@ivt/u-vehicles';

export function createRevisionRequestForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    email: new FormControl(null, ApsValidators.email),
    phone: new FormControl(null, ApsValidators.phone),
    vehicle: createVehicleForm(),
    address: createAddressForm(),
  });
}

@Component({
  selector: 'ivt-revision-request-form',
  templateUrl: './revision-request-form.component.html',
  styleUrls: ['./revision-request-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestFormComponent extends IvtFormComponent<RevisionRequest> {
  @Input() vehicle: Vehicle;
  @Input() currentVehicle: Vehicle;
  @Output() verifyVin = new EventEmitter<string>();

  get showVehicleAlert(): boolean {
    return !this.currentVehicle && this.vehicleForm.get('vin').valid;
  }

  get vehicleForm(): FormGroup {
    return this.form.get('vehicle') as FormGroup;
  }

  get addressForm(): FormGroup {
    return this.form.get('address') as FormGroup;
  }
}

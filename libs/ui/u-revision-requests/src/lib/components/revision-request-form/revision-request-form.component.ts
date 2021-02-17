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
export class RevisionRequestFormComponent
  extends IvtFormComponent<RevisionRequest>
  implements OnChanges, AfterViewInit {
  @Input() vehicle: Vehicle;
  @Input() currentVehicle: Vehicle;
  @Output() verifyVin = new EventEmitter<string>();

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

  get title(): string {
    if (this.item) {
      return this.isEditable ? 'Editar solicitud de revisión' : 'Detalle de solicitud de revisión';
    } else {
      return 'Nueva solicitud de revisión';
    }
  }

  get showVehicleAlert(): boolean {
    return !this.currentVehicle && !this.vehicle && this.vehicleForm.get('vin').valid && this.isEditable;
  }

  get vehicleForm(): FormGroup {
    return this.form.get('vehicle') as FormGroup;
  }

  get addressForm(): FormGroup {
    return this.form.get('address') as FormGroup;
  }
}

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
import { RevisionRequest, Vehicle } from '@innovatech/common/domain';
import { createAddressForm } from '@innovatech/ui/addresses/ui';
import { ApsFormComponent } from '@arphase/ui/core';
import { createVehicleForm } from '@innovatech/ui/vehicles/ui';

export function createRevisionRequestForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    email: new FormControl(null, ApsValidators.email),
    phone: new FormControl(null, ApsValidators.phone),
    additionalNotes: new FormControl(null),
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
  extends ApsFormComponent<RevisionRequest>
  implements OnChanges, AfterViewInit
{
  @Input() vehicle: Vehicle;
  @Input() currentVehicle: Vehicle;
  @Input() error: string;
  form = createRevisionRequestForm();
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

  get vehicleForm(): FormGroup {
    return this.form.get('vehicle') as FormGroup;
  }

  get addressForm(): FormGroup {
    return this.form.get('address') as FormGroup;
  }
}

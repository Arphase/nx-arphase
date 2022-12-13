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
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/forms';
import { RevisionRequest, Vehicle } from '@innovatech/common/domain';
import { createVehicleForm } from '@innovatech/ui/vehicles/ui';

export function createRevisionRequestForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, ApsValidators.required),
    email: new UntypedFormControl(null, ApsValidators.email),
    phone: new UntypedFormControl(null, ApsValidators.phone),
    additionalNotes: new UntypedFormControl(null),
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

  get vehicleForm(): UntypedFormGroup {
    return this.form.get('vehicle') as UntypedFormGroup;
  }

  get addressForm(): UntypedFormGroup {
    return this.form.get('address') as UntypedFormGroup;
  }
}

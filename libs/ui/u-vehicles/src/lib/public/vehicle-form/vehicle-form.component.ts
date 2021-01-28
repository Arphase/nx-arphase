import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Vehicle, VEHICLE_VIN_LENGTH } from '@ivt/c-data';
import { IvtFormComponent, IvtValidators } from '@ivt/u-ui';
import { filter, takeUntil } from 'rxjs/operators';

export function createVehicleForm(vehicle?: Vehicle) {
  const todayYear = new Date().getFullYear();

  const form = new FormGroup({
    id: new FormControl(null),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    year: new FormControl('', [
      IvtValidators.requiredNumber,
      Validators.min(todayYear - 20),
      Validators.max(todayYear + 1),
    ]),
    vin: new FormControl('', [
      Validators.required,
      Validators.minLength(VEHICLE_VIN_LENGTH),
      Validators.maxLength(VEHICLE_VIN_LENGTH),
    ]),
    motorNumber: new FormControl('', Validators.required),
    horsePower: new FormControl('', [IvtValidators.requiredNumber, Validators.min(1), Validators.max(400)]),
    companyId: new FormControl(null, Validators.required),
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
export class VehicleFormComponent extends IvtFormComponent<Vehicle> implements OnChanges {
  @Input() companyId: number;
  @Input() showCompanyInput: boolean;
  @Input() companyOptions: Select[] = [];
  @Output() verifyVin = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

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

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}

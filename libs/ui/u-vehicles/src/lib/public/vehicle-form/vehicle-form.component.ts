import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Vehicle } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

export function createVehicleForm(vehicle?: Vehicle) {
  const todayYear = new Date().getFullYear();

  const form = new FormGroup({
    id: new FormControl(null),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required, Validators.min(todayYear - 20), Validators.max(todayYear + 1)]),
    vin: new FormControl('', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]),
    motorNumber: new FormControl('', Validators.required),
    horsePower: new FormControl('', [Validators.required, Validators.max(400)]),
    companyId: new FormControl(null),
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

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.companyId) {
      this.form.get('companyId').patchValue(this.companyId || '');
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}

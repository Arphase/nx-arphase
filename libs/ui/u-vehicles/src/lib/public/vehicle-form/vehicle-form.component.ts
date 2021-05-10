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
import { IvtCollectionResponseInfo, Vehicle, VEHICLE_VIN_LENGTH } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { QueryParams } from '@ngrx/data';
import { omit } from 'lodash-es';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { combineLatest } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export function createVehicleForm(vehicle?: Vehicle) {
  const todayYear = new Date().getFullYear();

  const form = new FormGroup({
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

@Component({
  selector: 'ivt-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormComponent extends IvtFormComponent<Vehicle> implements OnChanges {
  @Input() companyId: number;
  @Input() showCompanyInput: boolean;
  @Input() companyOptions: NzSelectOptionInterface[] = [];
  @Input() vehicle: Vehicle;
  @Input() companiesInfo: IvtCollectionResponseInfo;
  form = createVehicleForm();
  @Output() verifyVin = new EventEmitter<string>();
  @Output() getCompanies = new EventEmitter<QueryParams>();
  @Output() getProducts = new EventEmitter<{ year: string; horsePower: string }>();

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

      combineLatest([this.form.get('horsePower').valueChanges, this.form.get('year').valueChanges])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([horsePower, year]) => this.getProducts.emit({ horsePower, year }));
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
      this.getProducts.emit({ horsePower: String(this.item.horsePower), year: String(this.item.year) });
    }

    if (changes.vehicle && this.isEditable) {
      if (this.vehicle) {
        this.form.patchValue(omit(this.vehicle, 'vin'));
        this.form.disable({ emitEvent: false });
        this.form.get('vin').enable({ emitEvent: false });
        this.getProducts.emit({ horsePower: String(this.vehicle.horsePower), year: String(this.vehicle.year) });
      } else {
        this.form.enable({ emitEvent: false });
        this.form.get('id').patchValue(null);
      }
    }

    if (changes.isEditable) {
      this.isEditable ? this.form.enable({ emitEvent: false }) : this.form.disable({ emitEvent: false });
    }
  }

  getMoreCompanies(): void {
    this.getCompanies.emit({ pageIndex: String(this.companiesInfo.pageIndex + 1), resetList: String(false) });
  }

  searchCompanies(text: string): void {
    this.getCompanies.emit({ text, resetList: String(true) });
  }
}

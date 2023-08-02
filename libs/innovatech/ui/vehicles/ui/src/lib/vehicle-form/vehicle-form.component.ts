import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApsFormComponent, enableControl } from '@arphase/ui/forms';
import { Vehicle, VEHICLE_VIN_LENGTH, VehicleKeys } from '@innovatech/common/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParams } from '@ngrx/data';
import { omit } from 'lodash';
import { filter } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'ivt-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormComponent extends ApsFormComponent<Partial<Vehicle>> implements OnChanges {
  @Input() companyId: number;
  @Input() showCompanyInput: boolean;
  @Output() verifyVin = new EventEmitter<string>();
  @Output() getCompanies = new EventEmitter<QueryParams>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.companyId) {
      this.form.get('companyId').patchValue(this.companyId);
    }

    if (changes.form && this.form) {
      this.addVinListener();
    }

    if (changes.showCompanyInput) {
      enableControl(this.form.get('companyId'), this.showCompanyInput, { emitEvent: false });
    }

    if (changes.item) {
      this.patchForm();
    }

    if (changes.isEditable) {
      enableControl(this.form, this.isEditable, { emitEvent: false });
    }
  }

  addVinListener(): void {
    this.form
      .get('vin')
      .valueChanges.pipe(
        filter((vin: string) => vin.length === VEHICLE_VIN_LENGTH),
        untilDestroyed(this)
      )
      .subscribe(vin => this.verifyVin.emit(vin));
  }

  patchForm(): void {
    if (this.item?.id) {
      this.form.patchValue(this.item, { emitEvent: false });
      this.form.disable({ emitEvent: false });
      if (this.isEditable) {
        const enableIfEmpptyFields: VehicleKeys[] = ['version', 'year', 'motorNumber', 'horsePower'];
        enableIfEmpptyFields
          .filter(key => !this.item[key])
          .forEach(key => this.form.get(key).enable({ emitEvent: false }));
      }
      this.form.get('vin').enable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
      this.form.get('id').patchValue(null);
    }
  }
}

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
import { filter, startWith } from 'rxjs/operators';

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
  @Input() enableVin: boolean;
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

    if (changes.enableVin) {
      enableControl(this.form.get('vin'), this.enableVin, { emitEvent: false });
    }
  }

  addVinListener(): void {
    this.form
      .get('vin')
      .valueChanges.pipe(
        startWith(this.values.vin),
        filter((vin: string) => vin?.length === VEHICLE_VIN_LENGTH),
        untilDestroyed(this)
      )
      .subscribe(vin => this.verifyVin.emit(vin));
  }

  patchForm(): void {
    this.item?.id ? this.form.patchValue(this.item, { emitEvent: false }) : this.form.get('id').patchValue(null);
  }
}

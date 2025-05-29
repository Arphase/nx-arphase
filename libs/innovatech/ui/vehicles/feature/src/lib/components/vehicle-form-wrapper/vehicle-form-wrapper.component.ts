import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApsQueryParams } from '@arphase/common';
import { ApsFormComponent } from '@arphase/ui/forms';
import { Product, UserRoles, Vehicle } from '@innovatech/common/domain';
import { REQUIRED_ROLES } from '@innovatech/ui/permissions/data';

@Component({
  selector: 'ivt-vehicle-form-wrapper',
  templateUrl: './vehicle-form-wrapper.component.html',
  styleUrls: ['./vehicle-form-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
  standalone: false,
})
export class VehicleFormWrapperComponent extends ApsFormComponent<Vehicle> implements OnChanges {
  @Input() showCompanyInput: boolean;
  @Input() invalidVin: boolean;
  @Input() isEditable: boolean;
  @Input() products: Product[] = [];
  @Input() companyId: number;
  @Output() verifyVin = new EventEmitter<string>();
  @Output() getCompanies = new EventEmitter<ApsQueryParams>();
  @Output() getVehicleProducts = new EventEmitter<Partial<Vehicle>>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }

    if (changes.isEditable) {
      this.isEditable ? this.form.enable() : this.form.disable();
    }
  }
}

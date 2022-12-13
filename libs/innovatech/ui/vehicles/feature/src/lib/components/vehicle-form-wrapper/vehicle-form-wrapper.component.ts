import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserRoles, Vehicle } from '@innovatech/common/domain';
import { REQUIRED_ROLES } from '@innovatech/ui/permissions/data';
import { ApsFormComponent } from '@arphase/ui/forms';
import { QueryParams } from '@ngrx/data';

@Component({
  selector: 'ivt-vehicle-form-wrapper',
  templateUrl: './vehicle-form-wrapper.component.html',
  styleUrls: ['./vehicle-form-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
})
export class VehicleFormWrapperComponent extends ApsFormComponent<Vehicle> implements OnChanges {
  @Input() showCompanyInput: boolean;
  @Input() invalidVin: boolean;
  @Input() isEditable: boolean;
  @Output() verifyVin = new EventEmitter<string>();
  @Output() getCompanies = new EventEmitter<QueryParams>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }

    if (changes.isEditable) {
      this.isEditable ? this.form.enable() : this.form.disable();
    }
  }
}

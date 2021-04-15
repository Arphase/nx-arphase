import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IvtCollectionResponseInfo, UserRoles, Vehicle } from '@ivt/c-data';
import { REQUIRED_ROLES } from '@ivt/u-state';
import { IvtFormComponent } from '@ivt/u-ui';
import { QueryParams } from '@ngrx/data';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'ivt-vehicle-form-wrapper',
  templateUrl: './vehicle-form-wrapper.component.html',
  styleUrls: ['./vehicle-form-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
})
export class VehicleFormWrapperComponent extends IvtFormComponent<Vehicle> implements OnChanges {
  @Input() showCompanyInput: boolean;
  @Input() companyOptions: NzSelectOptionInterface[] = [];
  @Input() invalidVin: boolean;
  @Input() companiesInfo: IvtCollectionResponseInfo;
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

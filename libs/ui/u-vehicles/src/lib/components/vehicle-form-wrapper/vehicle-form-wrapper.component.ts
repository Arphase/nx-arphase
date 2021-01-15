import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Select, Vehicle } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { takeUntil } from 'rxjs/operators';

import { createVehicleForm, VehicleFormComponent } from '../../public';

@Component({
  selector: 'ivt-vehicle-form-wrapper',
  templateUrl: './vehicle-form-wrapper.component.html',
  styleUrls: ['./vehicle-form-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormWrapperComponent extends IvtFormComponent<Vehicle> implements OnInit, OnChanges {
  @ViewChild(VehicleFormComponent) vehicleFormComponent: VehicleFormComponent;
  @Input() disabledCompanyInput: boolean;
  @Input() companyOptions: Select[] = [];
  form = createVehicleForm();

  ngOnInit() {
    this.stateChanged.pipe(takeUntil(this.destroy$)).subscribe(() => this.vehicleFormComponent.markForCheck());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabledCompanyInput) {
      this.disabledCompanyInput ? this.form.get('companyId').disable() : this.form.get('companyId').enable();
    }
  }
}

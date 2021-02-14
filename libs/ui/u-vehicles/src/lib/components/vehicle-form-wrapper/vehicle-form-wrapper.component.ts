import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Select, Vehicle } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-vehicle-form-wrapper',
  templateUrl: './vehicle-form-wrapper.component.html',
  styleUrls: ['./vehicle-form-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormWrapperComponent extends IvtFormComponent<Vehicle> implements OnChanges {
  @Input() disabledCompanyInput: boolean;
  @Input() companyOptions: Select[] = [];
  @Input() invalidVin: boolean;
  @Output() verifyVin = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabledCompanyInput) {
      this.disabledCompanyInput ? this.form.get('companyId').disable() : this.form.get('companyId').enable();
    }

    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }
}

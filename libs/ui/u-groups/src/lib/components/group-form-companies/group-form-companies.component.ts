import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group, PersonTypes, Select } from '@ivt/c-data';
import { CustomValidators, filterNil } from '@ivt/c-utils';
import { createAddressForm, IvtFormComponent } from '@ivt/u-ui';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-group-form-companies',
  templateUrl: './group-form-companies.component.html',
  styleUrls: ['./group-form-companies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormCompaniesComponent extends IvtFormComponent<Group> implements OnInit {

  get values() {
    return this.form.getRawValue();
  }

  get client() {
    return this.form.get('client');
  }

  get addressForm(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      businessName: null,
      rfc: null,
      contact: null,
      email: null,
      phone: null,
      address: createAddressForm(),
    })
  }

  ngOnInit(): void {
  }

}

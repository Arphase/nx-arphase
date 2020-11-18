import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group, PersonTypes, Select } from '@ivt/c-data';
import { CustomValidators, filterNil } from '@ivt/c-utils';
import { createAddressForm, IvtFormComponent } from '@ivt/u-ui';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-group-form-users',
  templateUrl: './group-form-users.component.html',
  styleUrls: ['./group-form-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormUsersComponent extends IvtFormComponent<Group> implements OnInit {

  get values() {
    return this.form.getRawValue();
  }

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      businessName: [null, Validators.required],
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      secondLastName: null,
      email: [null, Validators.required],
      phone: [null, Validators.required],
      businessRole: null,
      rfc: [null, [Validators.required, CustomValidators.rfc('any')]],
    })
  }

  ngOnInit(): void {
  }

}



  

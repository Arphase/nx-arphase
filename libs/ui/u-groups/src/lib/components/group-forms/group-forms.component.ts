import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group, PersonTypes, Select } from '@ivt/c-data';
import { CustomValidators, filterNil } from '@ivt/c-utils';
import { createAddressForm, IvtFormComponent } from '@ivt/u-ui';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-group-forms',
  templateUrl: './group-forms.component.html',
  styleUrls: ['./group-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormsComponent extends IvtFormComponent<Group> implements OnInit{

  get values() {
    return this.form.getRawValue();
  }

  /*
  get name() {
    return this.form.get('name');
  }

  get contact() {
    return this.form.get('contact');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }
  */


  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: null,
      contact: null,
      email: null,
      phone: null,
    });
  }

  ngOnInit(): void {
  }

}

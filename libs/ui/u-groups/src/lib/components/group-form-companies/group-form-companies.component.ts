import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Group } from '@ivt/c-data';
import { createAddressForm, IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-group-form-companies',
  templateUrl: './group-form-companies.component.html',
  styleUrls: ['./group-form-companies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormDialogComponent extends IvtFormComponent<Group> implements OnInit {

  get addressForm(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  get usersFormArray() {
    return (<FormArray>this.form.get('users'));
  }

  createUserGroup() {
    return this.fb.group({
      id: [],
      firstName: [],
      lastName: [],
      secondLastName: [],
      email: [],
      phone: [],
      role: "agencyUser",
      rfc: [],
    });
  }

  addUserToUsersFormArray() {
    this.usersFormArray.push(this.createUserGroup());
  }

  removeUserFromUsersFormArray(index) {
    this.usersFormArray.removeAt(index);
  }

  getUserGroupAtIndex(index) {
    return (<FormGroup>this.usersFormArray.at(index));
  }

  getUserControl() {
    return this.fb.control(null);
  }

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CompanyFormDialogComponent>) {
    super();
    this.form = this.fb.group({
      id: null,
      businessName: null,
      rfc: null,
      contact: null,
      email: null,
      phone: null,
      address: createAddressForm(),
      users: this.fb.array([]),
    });
  }

  ngOnInit() {
  }

  submit() {
    this.dialogRef.close(this.form);
  }

}

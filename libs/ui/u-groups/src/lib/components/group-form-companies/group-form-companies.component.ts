import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Group, UserRoles } from '@ivt/c-data';
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
    return <FormArray>this.form.get('users');
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CompanyFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
    if (this.data) {
      this.form.patchValue(this.data);
      this.data.users.forEach(element => {
        this.addUserToUsersFormArrayWithData(element);
      });
    }
  }

  createUserGroup() {
    return this.fb.group({
      id: [],
      firstName: [],
      lastName: [],
      secondLastName: [],
      email: [],
      phone: [],
      role: UserRoles[UserRoles.agencyUser],
      rfc: [],
    });
  }

  createUserGroupWithData(element) {
    return this.fb.group({
      id: element.id,
      firstName: element.firstName,
      lastName: element.lastName,
      secondLastName: element.secondLastName,
      email: element.email,
      phone: element.phone,
      role: UserRoles[UserRoles.agencyUser],
      rfc: element.rfc,
    });
  }

  addUserToUsersFormArrayWithData(element) {
    this.usersFormArray.push(this.createUserGroupWithData(element));
  }

  addUserToUsersFormArray() {
    this.usersFormArray.push(this.createUserGroup());
  }

  removeUserFromUsersFormArray(index) {
    this.usersFormArray.removeAt(index);
  }

  getUserGroupAtIndex(index) {
    return <FormGroup>this.usersFormArray.at(index);
  }

  getUserControl() {
    return this.fb.control(null);
  }

  submit() {
    this.dialogRef.close(this.form);
  }
}

import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company, Group } from '@ivt/c-data';
import { IvtFormComponent, markFormGroupTouched } from '@ivt/u-ui';

import { createUserForm } from '../user-form/user-form.constants';
import { createCompanyForm, patchCompanyForm } from './company-form-dialog.constants';

@Component({
  selector: 'ivt-company-form-dialog',
  templateUrl: './company-form-dialog.component.html',
  styleUrls: ['./company-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormDialogComponent extends IvtFormComponent<Group> implements OnInit {
  get addressForm(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  get usersFormArray(): FormArray {
    return this.form.get('users') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<CompanyFormDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public company: Company
  ) {
    super();
    this.form = createCompanyForm();
  }

  ngOnInit() {
    if (this.company) {
      patchCompanyForm(this.form, this.company);
    }
  }

  addUser(): void {
    this.usersFormArray.push(createUserForm());
  }

  removeUser(index: number): void {
    this.usersFormArray.removeAt(index);
  }

  submit(): void {
    if (this.form.valid || this.form.disabled) {
      this.dialogRef.close(this.values);
    } else {
      markFormGroupTouched(this.form);
    }
  }
}

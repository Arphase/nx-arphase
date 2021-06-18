import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui';
import { Company } from '@innovatech/common/domain';
import { updateFormControlsValueAndValidity } from '@innovatech/ui/core/data';

import { createCompanyForm, createUserForm, patchCompanyForm } from '../../functions/group-form.functions';

@Component({
  selector: 'ivt-company-form-dialog',
  templateUrl: './company-form-dialog.component.html',
  styleUrls: ['./company-form-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormDialogComponent extends ApsFormComponent<Company> implements OnInit {
  @Input() company: Company;
  form = createCompanyForm();

  get addressForm(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  get usersFormArray(): FormArray {
    return this.form.get('users') as FormArray;
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

  submit(): boolean | Company {
    if (this.form.valid || this.form.disabled) {
      return this.values;
    } else {
      this.form.markAllAsTouched();
      setTimeout(() => updateFormControlsValueAndValidity(this.form));
      return false;
    }
  }
}

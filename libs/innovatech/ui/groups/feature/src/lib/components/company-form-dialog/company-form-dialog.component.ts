import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent, updateFormControlsValueAndValidity } from '@arphase/ui/core';
import { Company } from '@innovatech/common/domain';

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

  get addressForm(): UntypedFormGroup {
    return this.form.get('address') as UntypedFormGroup;
  }

  get usersFormArray(): UntypedFormArray {
    return this.form.get('users') as UntypedFormArray;
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

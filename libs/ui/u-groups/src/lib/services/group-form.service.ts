import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '@ivt/c-data';
import { filterExisting } from '@ivt/c-utils';
import { findFormArrayIndex } from '@ivt/u-ui';
import { take } from 'rxjs/operators';

import { CompanyFormDialogComponent } from '../components/company-form-dialog/company-form-dialog.component';
import { createCompanyForm, createGroupForm, patchCompanyForm } from '../functions/group-form.functions';

@Injectable()
export class GroupFormService {
  form = createGroupForm();

  get companiesFormArray(): FormArray {
    return this.form.get('companies') as FormArray;
  }

  constructor(private dialog: MatDialog) {}

  createCompany(): void {
    this.dialog
      .open(CompanyFormDialogComponent)
      .afterClosed()
      .pipe(filterExisting(), take(1))
      .subscribe(company => this.companiesFormArray.push(createCompanyForm(company)));
  }

  editCoompany(company: Company): void {
    this.dialog
      .open(CompanyFormDialogComponent, { data: company })
      .afterClosed()
      .pipe(filterExisting(), take(1))
      .subscribe(editedCompany => {
        const index = findFormArrayIndex<Company>(this.companiesFormArray, value => value.tempId === company.tempId);
        const form = this.companiesFormArray.at(index) as FormGroup;
        patchCompanyForm(form, editedCompany);
      });
  }
}

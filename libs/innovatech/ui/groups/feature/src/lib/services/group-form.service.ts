import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { filterExisting, findFormArrayIndex } from '@arphase/ui/core';
import { Company } from '@innovatech/common/domain';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs/operators';

import { CompanyFormDialogComponent } from '../components/company-form-dialog/company-form-dialog.component';
import { createCompanyForm, createGroupForm, patchCompanyForm } from '../functions/group-form.functions';

@Injectable()
export class GroupFormService {
  form = createGroupForm();

  get companiesFormArray(): FormArray {
    return this.form.get('companies') as FormArray;
  }

  constructor(private modal: NzModalService) {}

  createCompany(): void {
    this.modal
      .create({
        nzTitle: 'Crear compañía',
        nzContent: CompanyFormDialogComponent,
        nzStyle: { width: '80%' },
        nzOnOk: component => component.submit(),
      })
      .afterClose.pipe(filterExisting(), take(1))
      .subscribe(company => this.companiesFormArray.push(createCompanyForm(company)));
  }

  editCoompany(company: Company): void {
    this.modal
      .create({
        nzTitle: 'Editar compañía',
        nzContent: CompanyFormDialogComponent,
        nzComponentParams: { company },
        nzStyle: { width: '80%' },
        nzOnOk: component => component.submit(),
      })
      .afterClose.pipe(filterExisting(), take(1))
      .subscribe(editedCompany => {
        const index = findFormArrayIndex<Company>(this.companiesFormArray, value => value.tempId === company.tempId);
        const form = this.companiesFormArray.at(index) as FormGroup;
        patchCompanyForm(form, editedCompany);
      });
  }
}

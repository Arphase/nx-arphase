import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { findFormArrayIndex } from '@arphase/ui/forms';
import { filterExisting } from '@arphase/ui/utils';
import { Company } from '@innovatech/common/domain';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs/operators';

import { CompanyFormDialogComponent } from '../components/company-form-dialog/company-form-dialog.component';
import { createCompanyForm, createGroupForm, patchCompanyForm } from '../functions/group-form.functions';

@Injectable()
export class GroupFormService {
  form = createGroupForm();

  get companiesFormArray(): UntypedFormArray {
    return this.form.get('companies') as UntypedFormArray;
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
        nzData: { company },
        nzStyle: { width: '80%' },
        nzOnOk: component => component.submit(),
      })
      .afterClose.pipe(filterExisting(), take(1))
      .subscribe(editedCompany => {
        const index = findFormArrayIndex<Company>(this.companiesFormArray, value => value.tempId === company.tempId);
        const form = this.companiesFormArray.at(index) as UntypedFormGroup;
        patchCompanyForm(form, editedCompany);
      });
  }
}

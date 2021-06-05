import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Company, Group } from '@innovatech/common/domain';
import { IvtFormComponent } from '@innovatech/ui/core/data';
import { startWith } from 'rxjs/operators';

import { GroupFormService } from '../../services/group-form.service';

@Component({
  selector: 'ivt-group-company-list-container',
  templateUrl: './group-company-list-container.component.html',
  styleUrls: ['./group-company-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCompanyListContainerComponent extends IvtFormComponent<Group> {
  companies$ = this.companiesForm.valueChanges.pipe(startWith(this.companiesForm.getRawValue()));

  get companiesForm(): FormArray {
    return this.groupFormService.form.get('companies') as FormArray;
  }

  constructor(private groupFormService: GroupFormService) {
    super();
  }

  createCompany(): void {
    this.groupFormService.createCompany();
  }

  editCompany(company: Company): void {
    this.groupFormService.editCoompany(company);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { Company, Group } from '@innovatech/common/domain';
import { ApsFormComponent } from '@arphase/ui/forms';
import { startWith } from 'rxjs/operators';

import { GroupFormService } from '../../services/group-form.service';

@Component({
  selector: 'ivt-group-company-list-container',
  templateUrl: './group-company-list-container.component.html',
  styleUrls: ['./group-company-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GroupCompanyListContainerComponent extends ApsFormComponent<Group> {
  companies$ = this.companiesForm.valueChanges.pipe(startWith(this.companiesForm.getRawValue()));

  get companiesForm(): UntypedFormArray {
    return this.groupFormService.form.get('companies') as UntypedFormArray;
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

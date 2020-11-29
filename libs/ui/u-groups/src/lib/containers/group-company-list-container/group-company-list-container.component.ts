import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Company, Group } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { takeUntil } from 'rxjs/operators';

import { GroupFormService } from '../../services/group-form.service';

/**
 * TODO: Check wtf is going on with async pipe and form value changes when updating Angular
 */
@Component({
  selector: 'ivt-group-company-list-container',
  templateUrl: './group-company-list-container.component.html',
  styleUrls: ['./group-company-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCompanyListContainerComponent extends IvtFormComponent<Group> {
  companies$ = this.groupFormService.form.get('companies').valueChanges;
  companies: Company[];

  constructor(private groupFormService: GroupFormService, private cdr: ChangeDetectorRef) {
    super();
    this.companies$.pipe(takeUntil(this.destroy$)).subscribe(companies => {
      this.companies = companies;
      this.cdr.detectChanges();
    });
  }

  createCompany(): void {
    this.groupFormService.createCompany();
  }

  editCompany(company: Company): void {
    this.groupFormService.editCoompany(company);
  }
}

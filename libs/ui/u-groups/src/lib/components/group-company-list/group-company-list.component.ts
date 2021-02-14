import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Company } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { columns } from './group-company-list.constants';

@Component({
  selector: 'ivt-group-company-list',
  templateUrl: './group-company-list.component.html',
  styleUrls: ['./group-company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCompanyListComponent extends IvtListComponent<Company> {
  columns = columns;
  businessNameSortFn = (a: Company, b: Company) => a.businessName.localeCompare(b.businessName);
  rfcSortFn = (a: Company, b: Company) => a.rfc.localeCompare(b.rfc);
  contactSortFn = (a: Company, b: Company) => a.contact.localeCompare(b.contact);
  emailSortFn = (a: Company, b: Company) => a.email.localeCompare(b.email);
}

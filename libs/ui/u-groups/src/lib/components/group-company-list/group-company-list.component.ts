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
}
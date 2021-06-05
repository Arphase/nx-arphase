import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Company } from '@innovatech/common/domain';
import { IvtListComponent } from '@innovatech/ui/core/data';

import { columns } from './group-company-list.constants';

@Component({
  selector: 'ivt-group-company-list',
  templateUrl: './group-company-list.component.html',
  styleUrls: ['./group-company-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCompanyListComponent extends IvtListComponent<Company> {
  columns = columns;
}

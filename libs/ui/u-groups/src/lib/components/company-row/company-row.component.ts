import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';

import { GroupCompanyListComponent } from '../group-company-list/group-company-list.component';

@Component({
  selector: 'ivt-company-row',
  templateUrl: './company-row.component.html',
  styleUrls: ['./company-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyRowComponent extends IvtRowComponent<Company> {
  constructor(public dialog: MatDialog, public groupCompanyList: GroupCompanyListComponent) {
    super();
  }

  editCompany() {
    this.groupCompanyList.openWithData(this.item);
  }
}

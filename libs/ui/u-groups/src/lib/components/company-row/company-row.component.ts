import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Company } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-company-row',
  templateUrl: './company-row.component.html',
  styleUrls: ['./company-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyRowComponent extends IvtRowComponent<Company> {}

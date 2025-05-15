import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsCollectionCheckboxFilterComponent } from '@arphase/ui/core';
import { Company } from '@innovatech/common/domain';
import { CompanyCollectionService } from '@innovatech/ui/companies/data';

@Component({
    selector: 'ivt-company-checkbox-filter',
    templateUrl: './company-checkbox-filter.component.html',
    styleUrls: ['./company-checkbox-filter.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CompanyCheckboxFilterComponent extends ApsCollectionCheckboxFilterComponent<Company> {
  sortValue = [{ key: 'company.businessName', value: 'ascend' }];
  filterPropertyName = 'companyIds';
  constructor(protected companyCollectionService: CompanyCollectionService) {
    super(companyCollectionService);
  }
}

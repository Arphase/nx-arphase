import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Company } from '@innovatech/common/domain';
import { CompanyFilterCollectionService } from '@innovatech/ui/companies/data';
import { CollectionCheckboxFilter } from '@innovatech/ui/core/data';

@Component({
  selector: 'ivt-company-checkbox-filter',
  templateUrl: './company-checkbox-filter.component.html',
  styleUrls: ['./company-checkbox-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCheckboxFilterComponent extends CollectionCheckboxFilter<Company> {
  sortValue = [{ key: 'company.businessName', value: 'ascend' }];
  filterPropertyName = 'companyIds';
  constructor(protected companyFilterCollectionService: CompanyFilterCollectionService) {
    super(companyFilterCollectionService);
  }
}

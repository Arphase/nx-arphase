import { ChangeDetectorRef, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsCollectionSelectDirective } from '@arphase/ui/core';
import { Company } from '@innovatech/common/domain';
import { CompanyFilterCollectionService } from '@innovatech/ui/companies/data';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({
  selector: '[ivtCompanySelect]',
})
export class CompanySelectDirective extends ApsCollectionSelectDirective<Company> {
  sortValue = [{ key: 'company.businessName', value: 'ascend' }];
  constructor(
    protected host: NzSelectComponent,
    protected companyFilterCollectionService: CompanyFilterCollectionService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef
  ) {
    super(host, companyFilterCollectionService, ngControl, cdr);
  }
}

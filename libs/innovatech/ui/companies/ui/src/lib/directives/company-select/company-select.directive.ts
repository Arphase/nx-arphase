import { ChangeDetectorRef, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsCollectionSelectDirective } from '@arphase/ui/core';
import { Company } from '@innovatech/common/domain';
import { CompanyCollectionService } from '@innovatech/ui/companies/data';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({
  selector: '[ivtCompanySelect]',
  standalone: false,
})
export class CompanySelectDirective extends ApsCollectionSelectDirective<Company> {
  sortValue = [{ key: 'company.businessName', value: 'ascend' }];
  constructor(
    protected host: NzSelectComponent,
    protected companyCollectionService: CompanyCollectionService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef,
  ) {
    super(host, companyCollectionService, ngControl, cdr);
  }
}

import { ChangeDetectorRef, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Company } from '@innovatech/common/domain';
import { CompanyFilterCollectionService } from '@innovatech/ui/companies/data';
import { CollectionSelectDirective } from '@innovatech/ui/core/data';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@UntilDestroy()
@Directive({
  selector: '[ivtCompanySelect]',
})
export class CompanySelectDirective extends CollectionSelectDirective<Company> {
  sortValue = [{ key: 'company.businessName', value: 'ascend' }] as any;
  constructor(
    protected host: NzSelectComponent,
    protected companyFilterCollectionService: CompanyFilterCollectionService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef
  ) {
    super(host, companyFilterCollectionService, ngControl, cdr);
  }
}

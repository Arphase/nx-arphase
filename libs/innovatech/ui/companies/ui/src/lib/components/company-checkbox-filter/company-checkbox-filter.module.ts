import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompaniesDataModule } from '@innovatech/ui/companies/data';
import { IvtCheckboxFilterModule } from '@ivt/u-ui';

import { CompanyCheckboxFilterComponent } from './company-checkbox-filter.component';

@NgModule({
  imports: [CommonModule, CompaniesDataModule, IvtCheckboxFilterModule],
  declarations: [CompanyCheckboxFilterComponent],
  exports: [CompanyCheckboxFilterComponent],
})
export class CompanyCheckboxFilterModule {}

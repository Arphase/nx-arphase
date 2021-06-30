import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApsCheckboxFilterModule } from '@arphase/ui';
import { CompaniesDataModule } from '@innovatech/ui/companies/data';

import { CompanyCheckboxFilterComponent } from './company-checkbox-filter.component';

@NgModule({
  imports: [CommonModule, CompaniesDataModule, ApsCheckboxFilterModule],
  declarations: [CompanyCheckboxFilterComponent],
  exports: [CompanyCheckboxFilterComponent],
})
export class CompanyCheckboxFilterModule {}

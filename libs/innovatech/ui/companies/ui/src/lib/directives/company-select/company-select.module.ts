import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompaniesDataModule } from '@innovatech/ui/companies/data';

import { CompanySelectDirective } from './company-select.directive';

@NgModule({
  imports: [CommonModule, CompaniesDataModule],
  declarations: [CompanySelectDirective],
  exports: [CompanySelectDirective],
})
export class CompanySelectModule {}

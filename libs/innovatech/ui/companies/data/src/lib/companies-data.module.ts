import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtDataService } from '@innovatech/ui/core/data';
import { EntityDataService } from '@ngrx/data';

import { CompanyDataService } from './services/company-data.service';
import { CompanyFilterDataService } from './services/company-filter-data.service';

@NgModule({
  imports: [CommonModule],
})
export class CompaniesDataModule {
  constructor(
    entityDataService: EntityDataService,
    companyDataService: CompanyDataService,
    companyFilterDataService: CompanyFilterDataService
  ) {
    const services: Record<string, IvtDataService<unknown>> = {
      Company: companyDataService,
      CompanyFilter: companyFilterDataService,
    };
    entityDataService.registerServices(services);
  }
}

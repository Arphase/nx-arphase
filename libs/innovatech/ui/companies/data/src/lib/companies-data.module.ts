import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';

import { CompanyDataService } from './services/company-data.service';

@NgModule({
  imports: [CommonModule],
})
export class CompaniesDataModule {
  constructor(entityDataService: EntityDataService, companyDataService: CompanyDataService) {
    entityDataService.registerService('Company', companyDataService);
  }
}

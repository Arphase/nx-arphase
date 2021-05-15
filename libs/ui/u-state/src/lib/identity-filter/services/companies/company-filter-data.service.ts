import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class CompanyFilterDataService extends IvtDataService<Company> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('CompanyFilter', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/companies/`;
    this.entitiesUrl = `/ivtApi/companies`;
  }
}

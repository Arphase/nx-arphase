import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@innovatech/common/domain';
import { IvtDataService } from '@innovatech/ui/core/data';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class CompanyDataService extends IvtDataService<Company> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Company', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/companies/`;
    this.entitiesUrl = `/ivtApi/companies`;
  }
}

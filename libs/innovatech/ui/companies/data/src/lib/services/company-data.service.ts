import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { Company } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class CompanyDataService extends ApsDataService<Company> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Company', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/companies/`;
    this.entitiesUrl = `/ivtApi/companies`;
  }
}

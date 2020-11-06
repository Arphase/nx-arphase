import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Company, GuaranteeSummary } from '@ivt/c-data';
import { saveFile } from '@ivt/c-utils';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '../../state-config';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService extends IvtDataService<Company> {

  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {
    super('Company', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/groups/`;
    this.entitiesUrl = `${this.config.apiUrl}/groups`;
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Company } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from '../../core';
import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '../../ui-state-config';

@Injectable({
  providedIn: 'root',
})
export class CompanyDataService extends IvtDataService<Company> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration
  ) {
    super('Company', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/groups/`;
    this.entitiesUrl = `${this.config.apiUrl}/groups`;
  }
}

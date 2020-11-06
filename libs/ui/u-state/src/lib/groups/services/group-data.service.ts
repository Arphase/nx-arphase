import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Group, GuaranteeSummary } from '@ivt/c-data';
import { saveFile } from '@ivt/c-utils';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '../../state-config';

@Injectable({
  providedIn: 'root'
})
export class GroupDataService extends IvtDataService<Group> {

  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {
    super('Group', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/groups/`;
    this.entitiesUrl = `${this.config.apiUrl}/groups`;
  }
}

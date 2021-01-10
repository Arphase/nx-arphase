import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from '../../core';
import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '../../ui-state-config';

@Injectable({
  providedIn: 'root',
})
export class UserDataService extends IvtDataService<User> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration
  ) {
    super('User', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/users/`;
    this.entitiesUrl = `${this.config.apiUrl}/users`;
  }
}

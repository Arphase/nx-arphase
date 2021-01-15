import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Vehicle } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from '../../core';
import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '../../ui-state-config';

@Injectable({
  providedIn: 'root',
})
export class VehicleDataService extends IvtDataService<Vehicle> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration
  ) {
    super('Vehicle', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/vehicles/`;
    this.entitiesUrl = `${this.config.apiUrl}/vehicles`;
  }
}

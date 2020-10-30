import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';
import { IvtDataService } from '../../core';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '../../state-config';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService extends IvtDataService<Product> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {
    super('Product', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/products/`;
    this.entitiesUrl = `${this.config.apiUrl}/products`;
  }
}

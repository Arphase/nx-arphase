import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui';
import { HttpUrlGenerator } from '@ngrx/data';
import { AdditionalProduct } from '@valmira/domain';

@Injectable({
  providedIn: 'root',
})
export class AdditionalProductDataService extends ApsDataService<AdditionalProduct> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('AdditionalProduct', http, httpUrlGenerator);
    this.entityUrl = `/vmaApi/additional-products/`;
    this.entitiesUrl = `/vmaApi/additional-products`;
  }
}

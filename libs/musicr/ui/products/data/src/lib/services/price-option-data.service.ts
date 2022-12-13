import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/data';
import { PriceOption } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class PriceOptionDataService extends ApsDataService<PriceOption> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('PriceOption', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/price-options/`;
    this.entitiesUrl = `/mrlApi/price-options`;
  }
}

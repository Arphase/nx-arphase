import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/data';
import { Product } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ProductDataService extends ApsDataService<Product> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Product', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/products/`;
    this.entitiesUrl = `/mrlApi/products`;
  }
}

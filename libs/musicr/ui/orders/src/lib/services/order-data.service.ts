import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { Order } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class OrderDataService extends ApsDataService<Order> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Order', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/orders/`;
    this.entitiesUrl = `/mrlApi/orders`;
  }
}

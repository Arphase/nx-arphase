import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group, IvtCollectionResponse, Product } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IvtDataService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class GroupDataService extends IvtDataService<Group> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Group', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/groups/`;
    this.entitiesUrl = `/ivtApi/groups`;
  }

  getGroupProducts(groupId: number): Observable<Product[]> {
    const params = new HttpParams({ fromObject: { groupId: String(groupId) } });
    return this.http
      .get<IvtCollectionResponse<Product>>('/ivtApi/products', { params })
      .pipe(map(response => response.results));
  }

  assignGroupProducts(payload: { groupId: number; productIds: number[] }): Observable<IvtCollectionResponse<Product>> {
    return this.http.put<IvtCollectionResponse<Product>>('/ivtApi/groups/assign/products', payload);
  }
}

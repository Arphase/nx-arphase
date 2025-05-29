import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsCollectionResponse } from '@arphase/common';
import { ApsDataService } from '@arphase/ui/data';
import { Group, Product } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GroupDataService extends ApsDataService<Group> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('Group', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/groups/`;
    this.entitiesUrl = `/ivtApi/groups`;
  }

  getGroupProducts(groupId: number): Observable<Product[]> {
    const params = new HttpParams({ fromObject: { groupId: String(groupId) } });
    return this.http
      .get<ApsCollectionResponse<Product>>('/ivtApi/products', { params })
      .pipe(map(response => response.results));
  }

  assignGroupProducts(payload: { groupId: number; productIds: number[] }): Observable<ApsCollectionResponse<Product>> {
    return this.http.put<ApsCollectionResponse<Product>>('/ivtApi/groups/assign/products', payload);
  }
}

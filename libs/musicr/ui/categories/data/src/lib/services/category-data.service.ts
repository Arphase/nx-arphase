import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeepPartial } from '@arphase/common';
import { ApsDataService } from '@arphase/ui/data';
import { Category } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryDataService extends ApsDataService<Category> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('Category', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/categories/`;
    this.entitiesUrl = `/mrlApi/categories`;
  }

  saveCategoriesOrder(categories: DeepPartial<Category>[]): Observable<Category[]> {
    return this.http.put<Category[]>('/mrlApi/categories/order', { categories });
  }
}

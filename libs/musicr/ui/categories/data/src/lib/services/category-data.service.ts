import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService extends ApsDataService<Category> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Category', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/categories/`;
    this.entitiesUrl = `/mrlApi/categories`;
  }
}

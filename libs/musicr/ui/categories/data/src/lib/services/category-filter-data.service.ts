import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class CategoryFilterDataService extends ApsDataService<Category> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('CategoryFilter', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/categories/`;
    this.entitiesUrl = `/mrlApi/categories`;
  }
}

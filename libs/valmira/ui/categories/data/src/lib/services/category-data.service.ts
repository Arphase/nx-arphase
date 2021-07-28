import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui';
import { HttpUrlGenerator } from '@ngrx/data';
import { Category } from '@valmira/domain';

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService extends ApsDataService<Category> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Category', http, httpUrlGenerator);
    this.entityUrl = `/vmaApi/categories/`;
    this.entitiesUrl = `/vmaApi/categories`;
  }
}

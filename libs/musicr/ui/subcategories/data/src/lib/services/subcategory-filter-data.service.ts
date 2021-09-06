import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { Subcategory } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SubcategoryFilterDataService extends ApsDataService<Subcategory> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('SubcategoryFilter', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/subcategories/`;
    this.entitiesUrl = `/mrlApi/subcategories`;
  }
}

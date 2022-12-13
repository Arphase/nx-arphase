import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/data';
import { Subcategory } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SubcategoryDataService extends ApsDataService<Subcategory> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Subcategory', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/subcategories/`;
    this.entitiesUrl = `/mrlApi/subcategories`;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { AdditionalOption } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class AdditionalOptionDataService extends ApsDataService<AdditionalOption> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('AdditionalOption', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/additional-options/`;
    this.entitiesUrl = `/mrlApi/additional-options`;
  }
}

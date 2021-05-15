import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RevisionRequest } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class RevisionRequestDataService extends IvtDataService<RevisionRequest> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('RevisionRequest', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/revision-requests/`;
    this.entitiesUrl = `/ivtApi/revision-requests`;
  }
}

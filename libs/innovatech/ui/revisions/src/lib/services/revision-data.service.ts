import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Revision } from '@innovatech/common/domain';
import { IvtDataService } from '@innovatech/ui/core/data';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class RevisionDataService extends IvtDataService<Revision> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Revision', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/revisions/`;
    this.entitiesUrl = `/ivtApi/revisions`;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class GroupDataService extends IvtDataService<Group> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Group', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/groups/`;
    this.entitiesUrl = `/ivtApi/groups`;
  }
}

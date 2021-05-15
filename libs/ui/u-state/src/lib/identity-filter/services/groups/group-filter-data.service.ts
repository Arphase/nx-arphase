import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class GroupFilterDataService extends IvtDataService<Group> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('GroupFilter', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/groups/`;
    this.entitiesUrl = `/ivtApi/groups`;
  }
}

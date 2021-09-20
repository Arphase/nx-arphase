import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { Group } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class GroupFilterDataService extends ApsDataService<Group> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('GroupFilter', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/groups/`;
    this.entitiesUrl = `/ivtApi/groups`;
  }
}

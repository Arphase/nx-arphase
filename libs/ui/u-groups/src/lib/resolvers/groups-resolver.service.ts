import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Group, IvtQueryParams } from '@ivt/c-data';
import { GroupCollectionService } from '@ivt/u-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupsResolverService implements Resolve<Group[]> {
  constructor(private groupCollectionService: GroupCollectionService) {}

  resolve(): Observable<Group[]> {
    const queryParams: IvtQueryParams = { resetList: true };
    return this.groupCollectionService.getWithQuery(queryParams as any);
  }
}

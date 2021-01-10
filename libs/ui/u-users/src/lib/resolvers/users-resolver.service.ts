import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IvtQueryParams, User } from '@ivt/c-data';
import { UserCollectionService } from '@ivt/u-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersResolverService implements Resolve<User[]> {
  constructor(private userCollectionService: UserCollectionService) {}

  resolve(): Observable<User[]> {
    this.userCollectionService.clearCache();
    const queryParams: IvtQueryParams = { resetList: String(true) };
    return this.userCollectionService.getWithQuery(queryParams);
  }
}

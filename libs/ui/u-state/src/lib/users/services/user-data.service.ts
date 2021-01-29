import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService extends IvtDataService<User> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('User', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/users/`;
    this.entitiesUrl = `/ivtApi/users`;
  }
}

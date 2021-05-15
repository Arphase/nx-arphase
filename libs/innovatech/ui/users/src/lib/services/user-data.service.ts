import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@innovatech/common/domain';
import { IvtDataService } from '@ivt/u-state';
import { HttpUrlGenerator } from '@ngrx/data';

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

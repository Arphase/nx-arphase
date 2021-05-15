import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';
import { IvtDataService } from '../../../core';

@Injectable({
  providedIn: 'root'
})
export class UserFilterDataService extends IvtDataService<User> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('UserFilter', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/users/`;
    this.entitiesUrl = `/ivtApi/users`;
  }
}

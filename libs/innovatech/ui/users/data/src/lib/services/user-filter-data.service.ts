import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@innovatech/common/domain';
import { IvtDataService } from '@innovatech/ui/core/data';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class UserFilterDataService extends IvtDataService<User> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('UserFilter', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/users/`;
    this.entitiesUrl = `/ivtApi/users`;
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/data';
import { User } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class UserDataService extends ApsDataService<User> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('User', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/users/`;
    this.entitiesUrl = `/ivtApi/users`;
  }
}

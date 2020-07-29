import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SignInRequest, User } from '@ivt/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  IVT_STATE_CONFIGURATION,
  IvtStateConfiguration,
} from '../../state-config';
import { getAuthUserStateState } from '../state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private store: Store<any>,
    private http: HttpClient,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {}

  signIn(payload: SignInRequest): Observable<User> {
    return this.http.post<User>(`${this.config.apiUrl}/auth/sign-in`, payload);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select(getAuthUserStateState),
      map((user) => !!user.token)
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResetPassword, SetPasswordPayload, SignInRequest, User } from '@ivt/c-data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '../../ui-state-config';
import { getAuthUserStateState } from '../state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private store: Store<any>,
    private http: HttpClient,
    @Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration
  ) {}

  signIn(payload: SignInRequest): Observable<User> {
    return this.http.post<User>(`${this.config.apiUrl}/auth/signIn`, payload);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select(getAuthUserStateState),
      map(user => !!user.token)
    );
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setPassword(payload: SetPasswordPayload): Observable<User> {
    return this.http.post<User>(`${this.config.apiUrl}/auth/setPassword`, payload);
  }

  validateToken(payload: Partial<SetPasswordPayload>): Observable<ResetPassword> {
    return this.http.get<ResetPassword>(`${this.config.apiUrl}/auth/validateToken/${payload.passwordToken}`);
  }
}

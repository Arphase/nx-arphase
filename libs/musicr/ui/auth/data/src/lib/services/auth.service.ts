import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInPayload } from '@arphase/ui/auth';
import { ResetPassword, User } from '@musicr/domain';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { SetPasswordPayload } from '../models';
import { getAuthUserStateState } from '../state/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store, private http: HttpClient) {}

  signIn(payload: SignInPayload): Observable<User> {
    return this.http.post<User>(`/mrlApi/auth/sign-in`, payload);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select(getAuthUserStateState),
      map(user => !!user?.token)
    );
  }

  getToken(): Observable<string> {
    return this.store.pipe(
      select(getAuthUserStateState),
      map(user => user?.token)
    );
  }

  setPassword(payload: SetPasswordPayload): Observable<User> {
    return this.http.post<User>(`/mrlApi/auth/set-password`, payload);
  }

  validateToken(payload: Partial<SetPasswordPayload>): Observable<ResetPassword> {
    return this.http.get<ResetPassword>(`/mrlApi/auth/validate-token/${payload.passwordToken}`);
  }

  sendPasswordEmail(payload: Partial<User>): Observable<void> {
    return this.http.post<void>(`/mrlApi/auth/email-password`, payload);
  }
}

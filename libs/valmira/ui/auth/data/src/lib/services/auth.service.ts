import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInPayload } from '@arphase/ui/auth';
import { select, Store } from '@ngrx/store';
import { ResetPassword, User } from '@valmira/domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SetPasswordPayload } from '../models';
import { getAuthUserStateState } from '../state/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private store: Store,
    private http: HttpClient,
  ) {}

  signIn(payload: SignInPayload): Observable<User> {
    return this.http.post<User>(`/vmaApi/auth/sign-in`, payload);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select(getAuthUserStateState),
      map(user => !!user?.token),
    );
  }

  getToken(): Observable<string> {
    return this.store.pipe(
      select(getAuthUserStateState),
      map(user => user?.token),
    );
  }

  setPassword(payload: SetPasswordPayload): Observable<User> {
    return this.http.post<User>(`/vmaApi/auth/set-password`, payload);
  }

  validateToken(payload: Partial<SetPasswordPayload>): Observable<ResetPassword> {
    return this.http.get<ResetPassword>(`/vmaApi/auth/validate-token/${payload.passwordToken}`);
  }

  sendPasswordEmail(payload: Partial<User>): Observable<void> {
    return this.http.post<void>(`/vmaApi/auth/email-password`, payload);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword, SetPasswordPayload, SignInRequest, User } from '@ivt/c-data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IvtState } from '../../state';
import { getAuthUserStateState } from '../state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store<IvtState>, private http: HttpClient) {}

  signIn(payload: SignInRequest): Observable<User> {
    return this.http.post<User>(`/ivtApi/auth/signIn`, payload);
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
    return this.http.post<User>(`/ivtApi/auth/setPassword`, payload);
  }

  validateToken(payload: Partial<SetPasswordPayload>): Observable<ResetPassword> {
    return this.http.get<ResetPassword>(`/ivtApi/auth/validateToken/${payload.passwordToken}`);
  }

  sendPasswordEmail(payload: Partial<User>): Observable<void> {
    return this.http.post<void>(`/ivtApi/auth/emailPassword`, payload);
  }
}

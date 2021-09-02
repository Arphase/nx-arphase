import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInPayload } from '@arphase/ui/auth';
import { User } from '@musicr/domain';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

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
}

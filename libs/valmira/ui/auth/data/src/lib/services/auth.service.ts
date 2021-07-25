import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@valmira/domain';
import { Observable } from 'rxjs';

import { SignInPayload } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store, private http: HttpClient) {}

  signIn(payload: SignInPayload): Observable<User> {
    return this.http.post<User>(`/vmaApi/auth/sign-in`, payload);
  }

  // isAuthenticated(): Observable<boolean> {
  //   return this.store.pipe(
  //     select(getAuthUserStateState),
  //     map(user => !!user?.token)
  //   );
  // }

  // getToken(): Observable<string> {
  //   return this.store.pipe(
  //     select(getAuthUserStateState),
  //     map(user => user?.token)
  //   );
  // }
}

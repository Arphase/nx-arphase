import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SignInRequest } from '@innovatech/data';
import { Observable } from 'rxjs';

import {
  IVT_STATE_CONFIGURATION,
  IvtStateConfiguration,
} from '../../state-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {}

  signIn(payload: SignInRequest): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/auth/sign-in`, payload);
  }
}

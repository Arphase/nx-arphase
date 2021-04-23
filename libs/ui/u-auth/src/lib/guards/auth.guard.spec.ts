import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@ivt/u-state';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let actions$ = new Observable<Action>();
  let spectator: SpectatorService<AuthGuard>;
  const createService = createServiceFactory({
    service: AuthGuard,
    imports: [RouterTestingModule],
    providers: [provideMockActions(() => actions$)],
    mocks: [AuthService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});

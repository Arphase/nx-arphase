import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { SetPasswordResolverService } from './set-password-resolver.service';

describe('SetPasswordResolverService', () => {
  let spectator: SpectatorService<SetPasswordResolverService>;
  // eslint-disable-next-line prefer-const
  let actions$ = new Observable<Action>();

  const createService = createServiceFactory({
    service: SetPasswordResolverService,
    imports: [RouterTestingModule],
    providers: [provideMockStore(), provideMockActions(() => actions$)],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});

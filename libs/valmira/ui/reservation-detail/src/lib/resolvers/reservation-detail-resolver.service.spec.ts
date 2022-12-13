import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { ReservationDetailResolverService } from './reservation-detail-resolver.service';

describe('ReservationDetailResolverService', () => {
  let spectator: SpectatorService<ReservationDetailResolverService>;
  const actions$ = new Observable<Action>();

  const createService = createServiceFactory({
    service: ReservationDetailResolverService,
    providers: [provideMockStore(), provideMockActions(() => actions$)],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});

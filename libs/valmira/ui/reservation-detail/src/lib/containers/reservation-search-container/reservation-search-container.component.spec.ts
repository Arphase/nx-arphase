import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { ReservationSearchContainerComponent } from './reservation-search-container.component';

describe('ReservationSearchContainerComponent', () => {
  let spectator: Spectator<ReservationSearchContainerComponent>;
  const actions$ = new Observable<Action>();

  const createComponent = createComponentFactory({
    component: ReservationSearchContainerComponent,
    imports: [RouterTestingModule],
    providers: [provideMockStore(), provideMockActions(() => actions$)],
    mocks: [LoadingService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

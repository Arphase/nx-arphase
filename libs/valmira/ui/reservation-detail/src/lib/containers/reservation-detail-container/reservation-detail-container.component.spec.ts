import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';

import { ReservationDetailContainerComponent } from './reservation-detail-container.component';

describe('ReservationDetailContainerComponent', () => {
  let spectator: Spectator<ReservationDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: ReservationDetailContainerComponent,
    providers: [provideMockStore()],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

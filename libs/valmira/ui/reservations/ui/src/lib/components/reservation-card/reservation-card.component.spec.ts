import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ReservationCardComponent } from './reservation-card.component';

describe('ReservationCardComponent', () => {
  let spectator: Spectator<ReservationCardComponent>;
  const createComponent = createComponentFactory({
    component: ReservationCardComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

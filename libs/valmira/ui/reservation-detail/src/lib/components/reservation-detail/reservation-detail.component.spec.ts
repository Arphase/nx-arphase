import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ReservationDetailComponent } from './reservation-detail.component';

describe('ReservationDetailComponent', () => {
  let spectator: Spectator<ReservationDetailComponent>;
  const createComponent = createComponentFactory({
    component: ReservationDetailComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

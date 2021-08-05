import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ReservationsComponent } from './reservations.component';

describe('ReservationsComponent', () => {
  let spectator: Spectator<ReservationsComponent>;
  const createComponent = createComponentFactory({
    component: ReservationsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

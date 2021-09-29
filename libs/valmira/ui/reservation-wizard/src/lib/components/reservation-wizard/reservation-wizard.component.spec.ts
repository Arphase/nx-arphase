import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ReservationWizardComponent } from './reservation-wizard.component';

describe('ReservationWizardComponent', () => {
  let spectator: Spectator<ReservationWizardComponent>;
  const createComponent = createComponentFactory({
    component: ReservationWizardComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

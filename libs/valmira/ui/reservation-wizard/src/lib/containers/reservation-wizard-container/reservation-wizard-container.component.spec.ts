import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';

import { ReservationWizardContainerComponent } from './reservation-wizard-container.component';

describe('ReservationWizardContainerComponent', () => {
  let spectator: Spectator<ReservationWizardContainerComponent>;
  const createComponent = createComponentFactory({
    component: ReservationWizardContainerComponent,
    imports: [RouterTestingModule],
    mocks: [ReservationCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

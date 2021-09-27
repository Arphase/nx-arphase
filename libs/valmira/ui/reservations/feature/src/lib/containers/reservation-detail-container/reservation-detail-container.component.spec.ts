import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';

import { ReservationDetailContainerComponent } from './reservation-detail-container.component';

describe('ReservationDetailContainerComponent', () => {
  let spectator: Spectator<ReservationDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: ReservationDetailContainerComponent,
    mocks: [ReservationCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

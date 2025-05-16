import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';

import { ConfirmationContainerComponent } from './confirmation-container.component';

describe('ConfirmationContainerComponent', () => {
  let spectator: Spectator<ConfirmationContainerComponent>;
  const createComponent = createComponentFactory({
    component: ConfirmationContainerComponent,
    mocks: [ReservationCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

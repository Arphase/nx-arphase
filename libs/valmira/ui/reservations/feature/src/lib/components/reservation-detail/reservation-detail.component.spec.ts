import { ApsEmptyPipe, ApsPhonePipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockPipe } from 'ng-mocks';

import { ReservationDetailComponent } from './reservation-detail.component';

describe('ReservationDetailComponent', () => {
  let spectator: Spectator<ReservationDetailComponent>;
  const createComponent = createComponentFactory({
    component: ReservationDetailComponent,
    declarations: [MockPipe(ApsPhonePipe), MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

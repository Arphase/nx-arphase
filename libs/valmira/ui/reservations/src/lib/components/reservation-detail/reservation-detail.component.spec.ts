import { ApsPhonePipe } from '@arphase/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { ReservationDetailComponent } from './reservation-detail.component';

describe('ReservationDetailComponent', () => {
  let spectator: Spectator<ReservationDetailComponent>;
  const createComponent = createComponentFactory({
    component: ReservationDetailComponent,
    declarations: [MockPipe(ApsPhonePipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

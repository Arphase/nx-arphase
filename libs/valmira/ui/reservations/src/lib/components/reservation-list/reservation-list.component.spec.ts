import { ApsEmptyPipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { ReservationListComponent } from './reservation-list.component';

describe('ReservationListComponent', () => {
  let spectator: Spectator<ReservationListComponent>;
  const createComponent = createComponentFactory({
    component: ReservationListComponent,
    imports: [NzDropDownModule],
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

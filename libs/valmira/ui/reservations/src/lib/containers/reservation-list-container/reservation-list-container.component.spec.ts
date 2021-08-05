import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ReservationCollectionService } from '../../services/reservation-collection.service';
import { ReservationDataService } from '../../services/reservation-data.service';
import { ReservationListContainerComponent } from './reservation-list-container.component';

describe('ReservationListContainerComponent', () => {
  let spectator: Spectator<ReservationListContainerComponent>;
  const createComponent = createComponentFactory({
    component: ReservationListContainerComponent,
    shallow: true,
    mocks: [ReservationCollectionService, ReservationDataService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

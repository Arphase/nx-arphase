import { ApsEmptyPipe, ApsPhonePipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { OrderListComponent } from './order-list.component';

describe('OrderListComponent', () => {
  let spectator: Spectator<OrderListComponent>;
  const createComponent = createComponentFactory({
    component: OrderListComponent,
    declarations: [MockPipe(ApsPhonePipe), MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

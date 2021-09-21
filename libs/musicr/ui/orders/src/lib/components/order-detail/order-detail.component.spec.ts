import { ApsEmptyPipe, ApsPhonePipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { AdditionalOptionsTotalPipe } from '../../pipes/additional-options-total.pipe';
import { OrderDetailComponent } from './order-detail.component';

describe('OrderDetailComponent', () => {
  let spectator: Spectator<OrderDetailComponent>;
  const createComponent = createComponentFactory({
    component: OrderDetailComponent,
    declarations: [MockPipe(ApsPhonePipe), MockPipe(ApsEmptyPipe), MockPipe(AdditionalOptionsTotalPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

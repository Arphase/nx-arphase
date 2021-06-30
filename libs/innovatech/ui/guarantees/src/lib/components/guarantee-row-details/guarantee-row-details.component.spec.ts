import { ApsEmptyPipe } from '@arphase/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { GuaranteeRowDetailsComponent } from './guarantee-row-details.component';

describe('GuaranteeRowDetailsComponent', () => {
  let spectator: Spectator<GuaranteeRowDetailsComponent>;
  const createComponent = createComponentFactory({
    component: GuaranteeRowDetailsComponent,
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

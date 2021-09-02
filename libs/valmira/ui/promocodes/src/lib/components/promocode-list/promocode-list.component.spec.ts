import { ApsEmptyPipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { PromocodeListComponent } from './promocode-list.component';

describe('PromocodeListComponent', () => {
  let spectator: Spectator<PromocodeListComponent>;
  const createComponent = createComponentFactory({
    component: PromocodeListComponent,
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

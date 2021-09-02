import { ApsEmptyPipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { AdditionalProductListComponent } from './additional-product-list.component';

describe('AdditionalProductListComponent', () => {
  let spectator: Spectator<AdditionalProductListComponent>;
  const createComponent = createComponentFactory({
    component: AdditionalProductListComponent,
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

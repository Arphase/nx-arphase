import { ApsEmptyPipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockPipe } from 'ng-mocks';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let spectator: Spectator<ProductListComponent>;
  const createComponent = createComponentFactory({
    component: ProductListComponent,
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

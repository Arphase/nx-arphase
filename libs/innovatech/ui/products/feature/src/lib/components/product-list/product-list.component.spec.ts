import { ApsEmptyPipe } from '@arphase/ui/core';
import { IvtFolioPipe } from '@innovatech/ui/core/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let spectator: Spectator<ProductListComponent>;
  const createComponent = createComponentFactory({
    component: ProductListComponent,
    declarations: [MockPipe(ApsEmptyPipe), MockPipe(IvtFolioPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

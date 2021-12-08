import { ApsEmptyPipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { AssignProductsModalComponent } from './assign-products-modal.component';

describe('AssignProductsModalComponent', () => {
  let spectator: Spectator<AssignProductsModalComponent>;
  const createComponent = createComponentFactory({
    component: AssignProductsModalComponent,
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

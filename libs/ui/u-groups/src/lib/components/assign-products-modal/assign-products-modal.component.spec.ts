import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AssignProductsModalComponent } from './assign-products-modal.component';

describe('AssignProductsModalComponent', () => {
  let spectator: Spectator<AssignProductsModalComponent>;
  const createComponent = createComponentFactory({
    component: AssignProductsModalComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

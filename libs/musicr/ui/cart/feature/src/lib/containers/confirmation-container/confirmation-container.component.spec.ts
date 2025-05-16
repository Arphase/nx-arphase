import { CartService } from '@musicr/ui/cart/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ConfirmationContainerComponent } from './confirmation-container.component';

describe('ConfirmationContainerComponent', () => {
  let spectator: Spectator<ConfirmationContainerComponent>;
  const createComponent = createComponentFactory({
    component: ConfirmationContainerComponent,
    mocks: [CartService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

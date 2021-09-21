import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let spectator: Spectator<ConfirmationComponent>;
  const createComponent = createComponentFactory({
    component: ConfirmationComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

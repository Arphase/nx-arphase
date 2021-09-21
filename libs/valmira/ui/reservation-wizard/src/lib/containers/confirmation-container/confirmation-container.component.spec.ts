import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ConfirmationContainerComponent } from './confirmation-container.component';

describe('ConfirmationContainerComponent', () => {
  let spectator: Spectator<ConfirmationContainerComponent>;
  const createComponent = createComponentFactory({
    component: ConfirmationContainerComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

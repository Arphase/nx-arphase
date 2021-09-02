import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ApsStatusMessageComponent } from './status-message.component';

describe('ApsStatusMessageComponent', () => {
  let spectator: Spectator<ApsStatusMessageComponent>;
  const createComponent = createComponentFactory({
    component: ApsStatusMessageComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

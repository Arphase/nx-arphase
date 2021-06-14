import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { IvtStatusMessageComponent } from './status-message.component';

describe('IvtStatusMessageComponent', () => {
  let spectator: Spectator<IvtStatusMessageComponent>;
  const createComponent = createComponentFactory({
    component: IvtStatusMessageComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

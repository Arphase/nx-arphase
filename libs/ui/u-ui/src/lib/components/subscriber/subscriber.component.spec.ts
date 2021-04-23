import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { IvtSubscriberComponent } from './subscriber.component';

describe('IvtSubscriberComponent', () => {
  let spectator: Spectator<IvtSubscriberComponent>;
  const createComponent = createComponentFactory({
    component: IvtSubscriberComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

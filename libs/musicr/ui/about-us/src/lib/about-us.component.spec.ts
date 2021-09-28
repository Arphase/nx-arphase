import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AboutUsComponent } from './about-us.component';

describe('AboutUsComponent', () => {
  let spectator: Spectator<AboutUsComponent>;

  const createComponent = createComponentFactory({
    component: AboutUsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});

import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SpaLayoutComponent } from './spa-layout.component';

describe('SpaLayoutComponent', () => {
  let spectator: Spectator<SpaLayoutComponent>;
  const createComponent = createComponentFactory({
    component: SpaLayoutComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

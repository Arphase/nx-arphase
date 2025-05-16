import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

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

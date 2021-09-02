import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ApsListComponent } from './list.component';

describe('ApsListComponent', () => {
  let spectator: Spectator<ApsListComponent>;
  const createComponent = createComponentFactory({
    component: ApsListComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

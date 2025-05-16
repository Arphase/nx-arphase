import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ApsListComponent } from './list.component';

describe('ApsListComponent', () => {
  let spectator: Spectator<ApsListComponent<unknown>>;
  const createComponent = createComponentFactory({
    component: ApsListComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

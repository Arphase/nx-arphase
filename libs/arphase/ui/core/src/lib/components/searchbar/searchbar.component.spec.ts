import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ApsSearchbarComponent } from './searchbar.component';

describe('ApsSearchbarComponent', () => {
  let spectator: Spectator<ApsSearchbarComponent>;
  const createComponent = createComponentFactory({
    component: ApsSearchbarComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

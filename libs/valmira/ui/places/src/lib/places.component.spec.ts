import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PlacesComponent } from './places.component';

describe('PlacesComponent', () => {
  let spectator: Spectator<PlacesComponent>;
  const createComponent = createComponentFactory({
    component: PlacesComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

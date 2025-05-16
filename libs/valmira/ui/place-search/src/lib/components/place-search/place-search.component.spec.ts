import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PlaceSearchComponent } from './place-search.component';

describe('PlaceSearchComponent', () => {
  let spectator: Spectator<PlaceSearchComponent>;
  const createComponent = createComponentFactory({
    component: PlaceSearchComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

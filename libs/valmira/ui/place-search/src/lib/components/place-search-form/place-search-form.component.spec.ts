import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PlaceSearchFormComponent } from './place-search-form.component';

describe('PlaceSearchFormComponent', () => {
  let spectator: Spectator<PlaceSearchFormComponent>;
  const createComponent = createComponentFactory({
    component: PlaceSearchFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

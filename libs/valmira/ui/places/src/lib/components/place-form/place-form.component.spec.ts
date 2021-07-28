import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PlaceFormComponent } from './place-form.component';

describe('PlaceFormComponent', () => {
  let spectator: Spectator<PlaceFormComponent>;
  const createComponent = createComponentFactory({
    component: PlaceFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PlaceDetailComponent } from './place-detail.component';

describe('PlaceDetailComponent', () => {
  let spectator: Spectator<PlaceDetailComponent>;
  const createComponent = createComponentFactory({
    component: PlaceDetailComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

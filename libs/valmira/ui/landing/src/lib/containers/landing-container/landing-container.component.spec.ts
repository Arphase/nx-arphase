import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PlaceCollectionService } from '@valmira/ui/places/data';

import { LandingContainerComponent } from './landing-container.component';

describe('LandingContainerComponent', () => {
  let spectator: Spectator<LandingContainerComponent>;
  const createComponent = createComponentFactory({
    component: LandingContainerComponent,
    mocks: [PlaceCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

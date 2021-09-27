import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { PlaceCollectionService, PlaceDataService } from '@valmira/ui/places/data';

import { PlaceSearchContainerComponent } from './place-search-container.component';

describe('PlaceSearchContainerComponent', () => {
  let spectator: Spectator<PlaceSearchContainerComponent>;
  const createComponent = createComponentFactory({
    component: PlaceSearchContainerComponent,
    shallow: true,
    mocks: [PlaceCollectionService, PlaceDataService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

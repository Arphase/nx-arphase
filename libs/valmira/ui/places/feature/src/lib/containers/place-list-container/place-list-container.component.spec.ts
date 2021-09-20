import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { PlaceCollectionService, PlaceDataService } from '@valmira/ui/places/data';

import { PlaceListContainerComponent } from './place-list-container.component';

describe('PlaceListContainerComponent', () => {
  let spectator: Spectator<PlaceListContainerComponent>;
  const createComponent = createComponentFactory({
    component: PlaceListContainerComponent,
    shallow: true,
    mocks: [PlaceCollectionService, PlaceDataService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

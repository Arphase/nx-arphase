import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PlaceCollectionService } from '../../services/place-collection.service';
import { PlaceDataService } from '../../services/place-data.service';
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

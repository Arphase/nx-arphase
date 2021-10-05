import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { PlaceCollectionService, PlaceDataService } from '@valmira/ui/places/data';

import { PlaceSearchContainerComponent } from './place-search-container.component';

describe('PlaceSearchContainerComponent', () => {
  let spectator: Spectator<PlaceSearchContainerComponent>;
  const createComponent = createComponentFactory({
    component: PlaceSearchContainerComponent,
    providers: [provideMockStore()],
    mocks: [PlaceCollectionService, PlaceDataService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

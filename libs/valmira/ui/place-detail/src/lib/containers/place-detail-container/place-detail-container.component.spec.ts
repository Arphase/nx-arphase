import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { PlaceCollectionService } from '@valmira/ui/places/data';

import { PlaceDetailContainerComponent } from './place-detail-container.component';

describe('PlaceDetailContainerComponent', () => {
  let spectator: Spectator<PlaceDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: PlaceDetailContainerComponent,
    imports: [RouterTestingModule],
    providers: [provideMockStore()],
    mocks: [PlaceCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

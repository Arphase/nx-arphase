import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { PlaceCollectionService } from '@valmira/ui/places/data';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';

import { PlaceDetailContainerComponent } from './place-detail-container.component';

describe('PlaceDetailContainerComponent', () => {
  let spectator: Spectator<PlaceDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: PlaceDetailContainerComponent,
    imports: [RouterTestingModule],
    providers: [provideMockStore()],
    mocks: [ReservationCollectionService, PlaceCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

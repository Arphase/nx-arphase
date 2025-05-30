import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';

import { PersonalDataContainerComponent } from './personal-data-container.component';

describe('PersonalDataContainerComponent', () => {
  let spectator: Spectator<PersonalDataContainerComponent>;
  const createComponent = createComponentFactory({
    component: PersonalDataContainerComponent,
    imports: [RouterTestingModule],
    providers: [provideMockStore()],
    mocks: [ReservationCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

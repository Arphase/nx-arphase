import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';

import { PersonalDataContainerComponent } from './personal-data-container.component';

describe('PersonalDataContainerComponent', () => {
  let spectator: Spectator<PersonalDataContainerComponent>;
  const createComponent = createComponentFactory({
    component: PersonalDataContainerComponent,
    imports: [RouterTestingModule],
    mocks: [ReservationCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

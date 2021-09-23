import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AdditionalProductCollectionService } from '@valmira/ui/additional-products/data';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';

import { AdditionalServicesContainerComponent } from './additional-services-container.component';

describe('AdditionalServicesContainerComponent', () => {
  let spectator: Spectator<AdditionalServicesContainerComponent>;
  const createComponent = createComponentFactory({
    component: AdditionalServicesContainerComponent,
    imports: [RouterTestingModule],
    mocks: [ReservationCollectionService, AdditionalProductCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

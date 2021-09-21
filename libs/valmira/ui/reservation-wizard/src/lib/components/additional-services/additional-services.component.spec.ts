import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AdditionalServicesComponent } from './additional-services.component';

describe('AdditionalServicesComponent', () => {
  let spectator: Spectator<AdditionalServicesComponent>;
  const createComponent = createComponentFactory({
    component: AdditionalServicesComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

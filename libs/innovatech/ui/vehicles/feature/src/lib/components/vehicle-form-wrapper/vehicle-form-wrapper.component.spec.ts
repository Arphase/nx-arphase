import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { VehicleFormWrapperComponent } from './vehicle-form-wrapper.component';

describe('VehicleFormWrapperComponent', () => {
  let spectator: Spectator<VehicleFormWrapperComponent>;
  const createComponent = createComponentFactory({
    component: VehicleFormWrapperComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

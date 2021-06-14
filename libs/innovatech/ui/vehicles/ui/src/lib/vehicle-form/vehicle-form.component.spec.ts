import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { VehicleFormComponent } from './vehicle-form.component';

describe('VehicleFormComponent', () => {
  let spectator: Spectator<VehicleFormComponent>;
  const createComponent = createComponentFactory({
    component: VehicleFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

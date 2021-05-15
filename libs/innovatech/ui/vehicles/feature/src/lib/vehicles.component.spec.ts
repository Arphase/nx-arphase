import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { VehiclesComponent } from './vehicles.component';

describe('VehiclesComponent', () => {
  let spectator: Spectator<VehiclesComponent>;
  const createComponent = createComponentFactory({
    component: VehiclesComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

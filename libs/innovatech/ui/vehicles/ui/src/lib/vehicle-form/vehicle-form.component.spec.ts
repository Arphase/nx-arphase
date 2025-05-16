import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { VehicleFormComponent } from './vehicle-form.component';
import { createVehicleForm } from './vehicle-form.constants';

describe('VehicleFormComponent', () => {
  let spectator: Spectator<VehicleFormComponent>;
  const createComponent = createComponentFactory({
    component: VehicleFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent({ props: { form: createVehicleForm() } })));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { Vehicle } from '@innovatech/common/domain';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { VehicleFormComponent } from './vehicle-form.component';
import { createVehicleForm } from './vehicle-form.constants';

describe('VehicleFormComponent', () => {
  let spectator: Spectator<VehicleFormComponent>;
  const createComponent = createComponentFactory({
    component: VehicleFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent({ props: { form: createVehicleForm() } })));

  it('should enable the fields that are empty when patching the form', () => {
    const mockedVehicle: Partial<Vehicle> = {
      id: 2,
      version: 'Pro',
      motorNumber: '2000',
    };
    spectator.component.item = mockedVehicle;

    spectator.component.patchForm();

    expect(spectator.component.form.get('version').disabled).toBeTruthy();
    expect(spectator.component.form.get('motorNumber').disabled).toBeTruthy();
    expect(spectator.component.form.get('year').disabled).toBeFalsy();
    expect(spectator.component.form.get('horsePower').disabled).toBeFalsy();
  });
});

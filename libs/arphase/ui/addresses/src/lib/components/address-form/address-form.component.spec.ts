import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ApsAddressFormComponent } from './address-form.component';
import { ApsAddressFormService } from './address-form.service';

describe('ApsAddressFormComponent', () => {
  let spectator: Spectator<ApsAddressFormComponent>;
  const createComponent = createComponentFactory({
    component: ApsAddressFormComponent,
    shallow: true,
    componentProviders: [{ provide: ApsAddressFormService, useValue: {} }],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { IvtAddressFormComponent } from './address-form.component';
import { IvtAddressFormService } from './address-form.service';

describe('IvtAddressFormComponent', () => {
  let spectator: Spectator<IvtAddressFormComponent>;
  const createComponent = createComponentFactory({
    component: IvtAddressFormComponent,
    shallow: true,
    componentProviders: [{ provide: IvtAddressFormService, useValue: {} }],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

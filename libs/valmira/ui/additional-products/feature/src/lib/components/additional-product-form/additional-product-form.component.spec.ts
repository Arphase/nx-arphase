import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { AdditionalProductFormComponent } from './additional-product-form.component';

describe('AdditionalProductFormComponent', () => {
  let spectator: Spectator<AdditionalProductFormComponent>;
  const createComponent = createComponentFactory({
    component: AdditionalProductFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

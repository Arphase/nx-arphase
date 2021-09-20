import { MUSIC_REVOLUTION_CONFIGURATION } from '@musicr/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let spectator: Spectator<ProductFormComponent>;
  const createComponent = createComponentFactory({
    component: ProductFormComponent,
    providers: [{ provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: {} }],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

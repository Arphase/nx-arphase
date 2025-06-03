import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ApsRangeFilterComponent } from '@arphase/ui/core';
import { NgxMaskDirective } from 'ngx-mask';
import { ProductsCatalogComponent } from './products-catalog.component';

describe('ProductsCatalogComponent', () => {
  let spectator: Spectator<ProductsCatalogComponent>;
  const createComponent = createComponentFactory({
    component: ProductsCatalogComponent,
    overrideComponents: [
      [ProductsCatalogComponent, { remove: { imports: [NgxMaskDirective, ApsRangeFilterComponent] } }],
    ],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

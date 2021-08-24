
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ProductsCatalogComponent } from './products-catalog.component';

describe('ProductsCatalogComponent', () => {
  let spectator: Spectator<ProductsCatalogComponent>;
  const createComponent = createComponentFactory({
    component: ProductsCatalogComponent,
    schemas: [NO_ERRORS_SCHEMA]
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

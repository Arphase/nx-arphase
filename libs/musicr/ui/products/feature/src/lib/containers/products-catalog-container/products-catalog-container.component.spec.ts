import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { TitleCasePipe } from '@angular/common';
import { signal } from '@angular/core';
import { ProductsCatalogComponent } from '../../components/products-catalog/products-catalog.component';
import { ProductsCatalogService } from '../../services/products-catalog.service';
import { ProductsCatalogContainerComponent } from './products-catalog-container.component';

describe('ProductsCatalogContainerComponent', () => {
  let spectator: Spectator<ProductsCatalogContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductsCatalogContainerComponent,
    overrideComponents: [[ProductsCatalogContainerComponent, { remove: { imports: [ProductsCatalogComponent] } }]],
    componentProviders: [
      {
        provide: ProductsCatalogService,
        useValue: {
          products: signal(null),
          title: signal(null),
          loading: signal(null),
          loadingSort: signal(null),
        },
      },
    ],
    componentMocks: [TitleCasePipe],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

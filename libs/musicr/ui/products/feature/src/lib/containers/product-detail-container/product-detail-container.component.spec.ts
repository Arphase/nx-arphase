import { CartService } from '@musicr/ui/cart/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { TitleCasePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductDetailService } from '../../services/product-detail.service';
import { ProductDetailContainerComponent } from './product-detail-container.component';

describe('ProductDetailContainerComponent', () => {
  let spectator: Spectator<ProductDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductDetailContainerComponent,
    providers: [provideRouter([])],
    componentProviders: [
      {
        provide: ProductDetailService,
        useValue: {
          loading: signal(null),
          product: signal(null),
          priceOptions: signal(null),
          additionalOptions: signal(null),
        },
      },
    ],
    overrideComponents: [
      [
        ProductDetailContainerComponent,
        { remove: { imports: [ProductDetailComponent] }, add: { imports: [MockComponent(ProductDetailComponent)] } },
      ],
    ],
    mocks: [CartService],
    componentMocks: [TitleCasePipe],
    shallow: true,
    schemas: [NO_ERRORS_SCHEMA],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

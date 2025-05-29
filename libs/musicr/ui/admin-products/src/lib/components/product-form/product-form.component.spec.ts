import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { CategorySelectModule } from '@musicr/ui/categories/ui';
import { MUSIC_REVOLUTION_CONFIGURATION } from '@musicr/ui/core';
import { SubcategorySelectModule } from '@musicr/ui/subcategories/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NgxMaskDirective } from 'ngx-mask';
import { AdditionalOptionsFormContainerComponent } from '../../containers/additional-options-form-container/additional-options-form-container.component';
import { PriceOptionsFormContainerComponent } from '../../containers/price-options-form-container/price-options-form-container.component';
import { ProductFormComponent } from './product-form.component';
describe('ProductFormComponent', () => {
  let spectator: Spectator<ProductFormComponent>;
  const createComponent = createComponentFactory({
    component: ProductFormComponent,
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      provideRouter([]),
      { provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: {} },
    ],
    overrideComponents: [
      [
        ProductFormComponent,
        {
          remove: {
            imports: [
              CategorySelectModule,
              SubcategorySelectModule,
              NgxMaskDirective,
              NzSelectComponent,
              PriceOptionsFormContainerComponent,
              AdditionalOptionsFormContainerComponent,
            ],
          },
          add: {
            imports: [
              MockComponent(NzSelectComponent),
              MockComponent(PriceOptionsFormContainerComponent),
              MockComponent(AdditionalOptionsFormContainerComponent),
            ],
          },
        },
      ],
    ],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

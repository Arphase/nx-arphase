import { PhotoCollectionService, ProductCollectionService } from '@musicr/ui/products/data';
import { SubcategoryCollectionService } from '@musicr/ui/subcategories/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { provideRouter } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductFormContainerComponent } from './product-form-container.component';

describe('ProductFormContainerComponent', () => {
  let spectator: Spectator<ProductFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductFormContainerComponent,
    shallow: true,
    providers: [provideRouter([])],
    overrideComponents: [
      [
        ProductFormContainerComponent,
        { remove: { imports: [ProductFormComponent] }, add: { imports: [MockComponent(ProductFormComponent)] } },
      ],
    ],
    mocks: [
      ProductCollectionService,
      NzMessageService,
      SubcategoryCollectionService,
      NzModalService,
      PhotoCollectionService,
    ],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

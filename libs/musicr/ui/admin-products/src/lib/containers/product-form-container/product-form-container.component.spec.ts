import { RouterTestingModule } from '@angular/router/testing';
import { PhotoCollectionService, ProductCollectionService } from '@musicr/ui/products/data';
import { SubcategoryCollectionService } from '@musicr/ui/subcategories/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ProductFormContainerComponent } from './product-form-container.component';

describe('ProductFormContainerComponent', () => {
  let spectator: Spectator<ProductFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
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

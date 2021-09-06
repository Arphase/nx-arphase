import { RouterTestingModule } from '@angular/router/testing';
import { SubcategoryFilterCollectionService } from '@musicr/ui/subcategories/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ProductCollectionService } from '../../services/product-collection.service';
import { ProductFormContainerComponent } from './product-form-container.component';

describe('ProductFormContainerComponent', () => {
  let spectator: Spectator<ProductFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    mocks: [ProductCollectionService, NzMessageService, SubcategoryFilterCollectionService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

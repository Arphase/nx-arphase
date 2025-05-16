import { RouterTestingModule } from '@angular/router/testing';
import { CategoryCollectionService } from '@musicr/ui/categories/data';
import { PhotoCollectionService } from '@musicr/ui/products/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CategoryFormContainerComponent } from './category-form-container.component';

describe('CategoryFormContainerComponent', () => {
  let spectator: Spectator<CategoryFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: CategoryFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    mocks: [CategoryCollectionService, PhotoCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

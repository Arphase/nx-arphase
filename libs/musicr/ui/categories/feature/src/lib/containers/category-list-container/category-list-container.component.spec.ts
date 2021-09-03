import { CategoryCollectionService, CategoryDataService } from '@musicr/ui/categories/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { CategoryListContainerComponent } from './category-list-container.component';

describe('CategoryListContainerComponent', () => {
  let spectator: Spectator<CategoryListContainerComponent>;
  const createComponent = createComponentFactory({
    component: CategoryListContainerComponent,
    shallow: true,
    mocks: [CategoryCollectionService, CategoryDataService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

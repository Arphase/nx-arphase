import { SubcategoryCollectionService, SubcategoryDataService } from '@musicr/ui/subcategories/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { SubcategoryListContainerComponent } from './subcategory-list-container.component';

describe('SubcategoryListContainerComponent', () => {
  let spectator: Spectator<SubcategoryListContainerComponent>;
  const createComponent = createComponentFactory({
    component: SubcategoryListContainerComponent,
    shallow: true,
    mocks: [SubcategoryCollectionService, SubcategoryDataService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

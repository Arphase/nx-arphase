import { RouterTestingModule } from '@angular/router/testing';
import { SubcategoryCollectionService } from '@musicr/ui/subcategories/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SubcategoryFormContainerComponent } from './subcategory-form-container.component';

describe('SubcategoryFormContainerComponent', () => {
  let spectator: Spectator<SubcategoryFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: SubcategoryFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    mocks: [SubcategoryCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

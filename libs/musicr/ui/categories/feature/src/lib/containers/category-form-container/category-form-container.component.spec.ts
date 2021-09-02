import { RouterTestingModule } from '@angular/router/testing';
import { CategoryCollectionService } from '@musicr/ui/categories/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CategoryFormContainerComponent } from './category-form-container.component';

describe('CategoryFormContainerComponent', () => {
  let spectator: Spectator<CategoryFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: CategoryFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    mocks: [CategoryCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { ApsEmptyPipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockPipe } from 'ng-mocks';

import { CategoryListComponent } from './category-list.component';

describe('CategoryListComponent', () => {
  let spectator: Spectator<CategoryListComponent>;
  const createComponent = createComponentFactory({
    component: CategoryListComponent,
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

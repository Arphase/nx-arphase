import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { CategoryFormComponent } from './category-form.component';

describe('CategoryFormComponent', () => {
  let spectator: Spectator<CategoryFormComponent>;
  const createComponent = createComponentFactory({
    component: CategoryFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

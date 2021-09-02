import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let spectator: Spectator<CategoriesComponent>;
  const createComponent = createComponentFactory({
    component: CategoriesComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SubcategoryFormComponent } from './subcategory-form.component';

describe('SubcategoryFormComponent', () => {
  let spectator: Spectator<SubcategoryFormComponent>;
  const createComponent = createComponentFactory({
    component: SubcategoryFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

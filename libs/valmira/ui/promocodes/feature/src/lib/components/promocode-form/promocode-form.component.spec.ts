import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PromocodeFormComponent } from './promocode-form.component';

describe('PromocodeFormComponent', () => {
  let spectator: Spectator<PromocodeFormComponent>;
  const createComponent = createComponentFactory({
    component: PromocodeFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

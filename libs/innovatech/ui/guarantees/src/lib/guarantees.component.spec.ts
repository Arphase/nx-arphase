import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { GuaranteesComponent } from './guarantees.component';

describe('GuaranteesComponent', () => {
  let spectator: Spectator<GuaranteesComponent>;
  const createComponent = createComponentFactory({
    component: GuaranteesComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

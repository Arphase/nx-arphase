import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { IvtListComponent } from './list.component';

describe('IvtListComponent', () => {
  let spectator: Spectator<IvtListComponent>;
  const createComponent = createComponentFactory({
    component: IvtListComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { IvtSearchbarComponent } from './searchbar.component';

describe('IvtSearchbarComponent', () => {
  let spectator: Spectator<IvtSearchbarComponent>;
  const createComponent = createComponentFactory({
    component: IvtSearchbarComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

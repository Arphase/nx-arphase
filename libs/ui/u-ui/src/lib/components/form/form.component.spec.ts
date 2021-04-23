import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { IvtFormComponent } from './form.component';

describe('IvtFormComponent', () => {
  let spectator: Spectator<IvtFormComponent>;
  const createComponent = createComponentFactory({
    component: IvtFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

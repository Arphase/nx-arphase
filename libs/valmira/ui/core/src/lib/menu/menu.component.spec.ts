import { NO_ERRORS_SCHEMA } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { MenuComponent } from './menu.component';

describe('ApsFormContainerComponent', () => {
  let spectator: Spectator<MenuComponent>;
  const createComponent = createComponentFactory({
    component: MenuComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

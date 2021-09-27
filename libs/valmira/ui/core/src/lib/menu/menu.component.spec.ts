import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';

import { MenuComponent } from './menu.component';

describe('ApsFormContainerComponent', () => {
  let spectator: Spectator<MenuComponent>;
  const createComponent = createComponentFactory({
    component: MenuComponent,
    providers: [provideMockStore()],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});


import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MenuContainerComponent } from './menu-container.component';

describe('MenuContainerComponent', () => {
  let spectator: Spectator<MenuContainerComponent>;
  const createComponent = createComponentFactory({
    component: MenuContainerComponent,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

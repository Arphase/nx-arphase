import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let spectator: Spectator<MenuComponent>;
  const createComponent = createComponentFactory({
    component: MenuComponent,
    imports: [RouterTestingModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

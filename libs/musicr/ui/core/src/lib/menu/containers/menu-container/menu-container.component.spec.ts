import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from '@musicr/ui/cart/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';

import { MenuContainerComponent } from './menu-container.component';

describe('MenuContainerComponent', () => {
  let spectator: Spectator<MenuContainerComponent>;
  const createComponent = createComponentFactory({
    component: MenuContainerComponent,
    imports: [HttpClientTestingModule],
    providers: [{ provide: CartService, useValue: { cartItems$: of([]) } }],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '@musicr/ui/cart/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { SocialEventFormContainerComponent } from './social-event-form-container.component';

describe('SocialEventFormContainerComponent', () => {
  let spectator: Spectator<SocialEventFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: SocialEventFormContainerComponent,
    imports: [RouterTestingModule],
    mocks: [CartService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

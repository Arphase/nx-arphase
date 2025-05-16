import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '@musicr/ui/cart/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PersonalDataFormContainerComponent } from './personal-data-form-container.component';

describe('PersonalDataFormContainerComponent', () => {
  let spectator: Spectator<PersonalDataFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: PersonalDataFormContainerComponent,
    imports: [RouterTestingModule],
    mocks: [CartService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

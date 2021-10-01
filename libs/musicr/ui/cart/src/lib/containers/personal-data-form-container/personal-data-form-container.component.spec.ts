import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PersonalDataFormContainerComponent } from './personal-data-form-container.component';

describe('PersonalDataFormContainerComponent', () => {
  let spectator: Spectator<PersonalDataFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: PersonalDataFormContainerComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

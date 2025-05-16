import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PersonalDataComponent } from './personal-data.component';

describe('PersonalDataComponent', () => {
  let spectator: Spectator<PersonalDataComponent>;
  const createComponent = createComponentFactory({
    component: PersonalDataComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

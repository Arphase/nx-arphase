import { PersonalDataFormComponent } from './personal-data-form.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

describe('PersonalDataFormComponent', () => {
  let spectator: Spectator<PersonalDataFormComponent>;
  const createComponent = createComponentFactory({
    component: PersonalDataFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

describe('TermsAndConditionsComponent', () => {
  let spectator: Spectator<TermsAndConditionsComponent>;
  const createComponent = createComponentFactory({
    component: TermsAndConditionsComponent,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ContactSuccessComponent } from './contact-success.component';

describe('ContactSuccessComponent', () => {
  let spectator: Spectator<ContactSuccessComponent>;
  const createComponent = createComponentFactory({
    component: ContactSuccessComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

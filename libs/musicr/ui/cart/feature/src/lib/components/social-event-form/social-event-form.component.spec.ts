import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SocialEventFormComponent } from './social-event-form.component';

describe('SocialEventFormComponent', () => {
  let spectator: Spectator<SocialEventFormComponent>;
  const createComponent = createComponentFactory({
    component: SocialEventFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

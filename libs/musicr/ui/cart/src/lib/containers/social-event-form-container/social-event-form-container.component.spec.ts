import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SocialEventFormContainerComponent } from './social-event-form-container.component';

describe('SocialEventFormContainerComponent', () => {
  let spectator: Spectator<SocialEventFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: SocialEventFormContainerComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

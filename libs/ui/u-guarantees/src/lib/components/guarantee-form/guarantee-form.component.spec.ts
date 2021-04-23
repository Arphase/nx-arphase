import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { GuaranteeFormComponent } from './guarantee-form.component';

describe('GuaranteeFormComponent', () => {
  let spectator: Spectator<GuaranteeFormComponent>;
  const createComponent = createComponentFactory({
    component: GuaranteeFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

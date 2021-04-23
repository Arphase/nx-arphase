import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { CompanyFormDialogComponent } from './company-form-dialog.component';

describe('CompanyFormDialogComponent', () => {
  let spectator: Spectator<CompanyFormDialogComponent>;
  const createComponent = createComponentFactory({
    component: CompanyFormDialogComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { CompanyFormDialogComponent } from './company-form-dialog.component';

describe('CompanyFormDialogComponent', () => {
  let spectator: Spectator<CompanyFormDialogComponent>;
  const createComponent = createComponentFactory({
    component: CompanyFormDialogComponent,
    providers: [{ provide: NZ_MODAL_DATA, useValue: { company: {} } }],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

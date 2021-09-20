import { ApsEmptyPipe, ApsPhonePipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { RevisionRequestListComponent } from './revision-request-list.component';

describe('RevisionRequestListComponent', () => {
  let spectator: Spectator<RevisionRequestListComponent>;
  const createComponent = createComponentFactory({
    component: RevisionRequestListComponent,
    imports: [NzDropDownModule],
    declarations: [MockPipe(ApsEmptyPipe), MockPipe(ApsPhonePipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

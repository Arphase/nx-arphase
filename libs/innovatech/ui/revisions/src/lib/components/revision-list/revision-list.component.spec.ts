import { IvtEmptyPipe } from '@ivt/u-ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { RevisionListComponent } from './revision-list.component';

describe('RevisionListComponent', () => {
  let spectator: Spectator<RevisionListComponent>;
  const createComponent = createComponentFactory({
    component: RevisionListComponent,
    imports: [NzDropDownModule],
    declarations: [MockPipe(IvtEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

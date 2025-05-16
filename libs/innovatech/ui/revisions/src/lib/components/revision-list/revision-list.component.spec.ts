import { ApsEmptyPipe } from '@arphase/ui/core';
import { IvtFolioPipe } from '@innovatech/ui/core/ui';
import { BasePermissionDirective, NoPermissionDirective } from '@innovatech/ui/permissions/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockDirective, MockPipe } from 'ng-mocks';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { EditableRevisionPipe } from '../../pipes/editable-revision.pipe';
import { RevisionListComponent } from './revision-list.component';

describe('RevisionListComponent', () => {
  let spectator: Spectator<RevisionListComponent>;
  const createComponent = createComponentFactory({
    component: RevisionListComponent,
    imports: [NzDropDownModule],
    declarations: [
      MockPipe(ApsEmptyPipe),
      MockPipe(IvtFolioPipe),
      MockPipe(EditableRevisionPipe),
      MockDirective(BasePermissionDirective),
      MockDirective(NoPermissionDirective),
    ],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

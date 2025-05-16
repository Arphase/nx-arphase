import { ApsEmptyPipe } from '@arphase/ui/core';
import { IvtFolioPipe } from '@innovatech/ui/core/ui';
import { BasePermissionDirective } from '@innovatech/ui/permissions/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockDirective, MockPipe } from 'ng-mocks';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { GuaranteeListComponent } from './guarantee-list.component';

describe('GuaranteeListComponent', () => {
  let spectator: Spectator<GuaranteeListComponent>;
  const createComponent = createComponentFactory({
    component: GuaranteeListComponent,
    imports: [NzDropDownModule],
    declarations: [MockPipe(IvtFolioPipe), MockPipe(ApsEmptyPipe), MockDirective(BasePermissionDirective)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

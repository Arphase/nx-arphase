import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { IvtCollectionService } from '../services/collection.service';
import { IvtDataService } from '../services/data.service';
import { IvtListContainerComponent } from './list-container.component';

describe('IvtListContainerComponent', () => {
  let spectator: Spectator<IvtListContainerComponent>;
  const createComponent = createComponentFactory({
    component: IvtListContainerComponent,
    shallow: true,
    mocks: [IvtCollectionService, IvtDataService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

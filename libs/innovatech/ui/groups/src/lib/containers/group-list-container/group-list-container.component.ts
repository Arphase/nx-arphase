import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Group } from '@innovatech/common/domain';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { NzModalService } from 'ng-zorro-antd/modal';

import { GroupCollectionService } from '../../services/group-collection.service';
import { GroupDataService } from '../../services/group-data.service';
import { AssignProductsModalContainerComponent } from '../assign-products-modal-container/assign-products-modal-container.component';

@Component({
  selector: 'ivt-group-list-container',
  templateUrl: './group-list-container.component.html',
  styleUrls: ['./group-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListContainerComponent extends IvtListContainerComponent<Group> {
  constructor(
    protected groupCollectionService: GroupCollectionService,
    protected groupDataService: GroupDataService,
    private modalService: NzModalService
  ) {
    super(groupCollectionService, groupDataService);
  }

  assignProducts(group: Group): void {
    this.modalService.create({
      nzTitle: `Asignar productos - ${group.name}`,
      nzContent: AssignProductsModalContainerComponent,
      nzComponentParams: { groupId: group.id },
      nzStyle: { minWidth: '85vw' },
      nzOnOk: component => component.submitChild(),
    });
  }
}

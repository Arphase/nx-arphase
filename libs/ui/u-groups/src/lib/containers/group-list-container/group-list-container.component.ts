import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Group } from '@ivt/c-data';
import { GroupCollectionService, GroupDataService, ProductCollectionService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { NzModalService } from 'ng-zorro-antd/modal';

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
      nzTitle: `Asignar productos al grupo ${group.name}`,
      nzContent: AssignProductsModalContainerComponent,
      nzOnOk: component => component.submitChild(),
    });
  }
}

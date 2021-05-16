import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revision, UserRoles } from '@innovatech/common/domain';
import { IdentityFilterService } from '@ivt/u-state';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { IvtListContainerComponent } from '@ivt/u-ui';
import dayjs from 'dayjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RevisionCollectionService } from '../../services/revision-collection.service';
import { RevisionDataService } from '../../services/revision-data.service';

@Component({
  selector: 'ivt-revision-list-container',
  templateUrl: './revision-list-container.component.html',
  styleUrls: ['./revision-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionListContainerComponent extends IvtListContainerComponent<Revision> {
  canCreateRevision$ = this.permissionService.hasUpdatePermission([UserRoles.superAdmin, UserRoles.repairman]);

  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected revisionDataService: RevisionDataService,
    protected modal: NzModalService,
    protected toastrService: NzMessageService,
    protected identityFilterService: IdentityFilterService,
    private permissionService: PermissionService
  ) {
    super(revisionCollectionService, revisionDataService, modal, toastrService, identityFilterService);
  }

  deleteItem(item: Revision): void {
    const date = dayjs(item.createdAt).format('DD/MM/YY');
    this.deleteConfirmMessage = `¿Desea eliminar la revisión con fecha ${date}?`;
    this.deleteSuccessMessage = `La revisión con fecha ${date} se ha eliminado`;
    super.deleteItem(item);
  }
}

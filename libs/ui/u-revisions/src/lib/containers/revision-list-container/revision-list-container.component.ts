import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revision } from '@ivt/c-data';
import { IdentityFilterService, RevisionCollectionService, RevisionDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import dayjs from 'dayjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'ivt-revision-list-container',
  templateUrl: './revision-list-container.component.html',
  styleUrls: ['./revision-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionListContainerComponent extends IvtListContainerComponent<Revision> {
  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected revisionDataService: RevisionDataService,
    protected modal: NzModalService,
    protected toastrService: NzMessageService,
    protected identityFilterService: IdentityFilterService
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

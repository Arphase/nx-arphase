import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revision } from '@ivt/c-data';
import { RevisionCollectionService, RevisionDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import dayjs from 'dayjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'ivt-revision-list-container',
  templateUrl: './revision-list-container.component.html',
  styleUrls: ['./revision-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionListContainerComponent extends IvtListContainerComponent<Revision> {
  title = localStorage.getItem('currentVehicleName') ? `${localStorage.getItem('currentVehicleName')}` : '';
  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected revisionDataService: RevisionDataService,
    protected modal: NzModalService,
    protected toastrService: NzMessageService
  ) {
    super(revisionCollectionService, revisionDataService, modal, toastrService);
  }

  deleteItem(item: Revision): void {
    const date = dayjs(item.createdAt).format('DD/mm/yy');
    this.deleteConfirmMessage = `¿Desea eliminar la revisión con fecha ${date}?`;
    this.deleteSuccessMessage = `La revisión con fecha ${date} se ha eliminado`;
    super.deleteItem(item);
  }
}

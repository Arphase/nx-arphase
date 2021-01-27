import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Revision } from '@ivt/c-data';
import { RevisionCollectionService, RevisionDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ivt-revision-list-container',
  templateUrl: './revision-list-container.component.html',
  styleUrls: ['./revision-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionListContainerComponent extends IvtListContainerComponent<Revision> {
  title = `Revisiones ${localStorage.getItem('currentVehicleName')}`;
  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected revisionDataService: RevisionDataService,
    protected dialog: MatDialog,
    protected toastrService: ToastrService
  ) {
    super(revisionCollectionService, revisionDataService, dialog, toastrService);
  }

  deleteItem(item: Revision): void {
    const date = dayjs(item.createdAt).format('DD/mm/yy');
    this.deleteConfirmMessage = `¿Desea eliminar la revisión con fecha ${date}?`;
    this.deleteSuccessMessage = `La revisión con fecha ${date} se ha eliminado`;
    super.deleteItem(item);
  }
}

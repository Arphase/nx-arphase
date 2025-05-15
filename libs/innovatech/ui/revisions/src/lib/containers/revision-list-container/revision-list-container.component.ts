import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Revision, Vehicle } from '@innovatech/common/domain';
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
    standalone: false
})
export class RevisionListContainerComponent extends ApsListContainerComponent<Revision> {
  excelFileName = 'Revisiones';

  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected revisionDataService: RevisionDataService,
    protected modal: NzModalService,
    protected toastrService: NzMessageService,
    private router: Router
  ) {
    super(revisionCollectionService, revisionDataService, modal, toastrService);
  }

  createGuarantee(vehicle: Vehicle): void {
    this.router.navigateByUrl(`/spa/guarantees/new?vehicleVin=${vehicle.vin}`);
  }

  deleteItem(item: Revision): void {
    const date = dayjs(item.createdAt).format('DD/MM/YY');
    this.deleteConfirmMessage = `¿Desea eliminar la revisión con fecha ${date}?`;
    this.deleteSuccessMessage = `La revisión con fecha ${date} se ha eliminado`;
    super.deleteItem(item);
  }
}

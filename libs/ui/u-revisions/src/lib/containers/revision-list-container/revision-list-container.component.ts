import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revision, UserRoles } from '@ivt/c-data';
import {
  getAuthUserRoleState,
  IdentityFilterService,
  IvtState,
  RevisionCollectionService,
  RevisionDataService,
} from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import dayjs from 'dayjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ivt-revision-list-container',
  templateUrl: './revision-list-container.component.html',
  styleUrls: ['./revision-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionListContainerComponent extends IvtListContainerComponent<Revision> {
  isSuperAdmin$ = this.store.pipe(
    select(getAuthUserRoleState),
    map(role => UserRoles[role] === UserRoles.superAdmin)
  );
  groupOptions$ = this.identityFilterService.groupOptions$;
  companyOptions$ = this.identityFilterService.companyOptions$;
  userOptions$ = this.identityFilterService.userOptions$;

  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected revisionDataService: RevisionDataService,
    protected modal: NzModalService,
    protected toastrService: NzMessageService,
    protected identityFilterService: IdentityFilterService,
    private store: Store<IvtState>
  ) {
    super(revisionCollectionService, revisionDataService, modal, toastrService, identityFilterService);
  }

  deleteItem(item: Revision): void {
    const date = dayjs(item.createdAt).format('DD/mm/yy');
    this.deleteConfirmMessage = `¿Desea eliminar la revisión con fecha ${date}?`;
    this.deleteSuccessMessage = `La revisión con fecha ${date} se ha eliminado`;
    super.deleteItem(item);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevisionRequest, UserRoles } from '@ivt/c-data';
import { getAuthUserRoleState, IvtState, RevisionRequestCollectionService, RevisionRequestDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ivt-revision-request-list-container',
  templateUrl: './revision-request-list-container.component.html',
  styleUrls: ['./revision-request-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestListContainerComponent extends IvtListContainerComponent<RevisionRequest> {
  showDetailOption$ = this.store.pipe(select(getAuthUserRoleState), map(role => UserRoles[role] === UserRoles.superAdmin));

  constructor(
    protected revisionRequestCollecitonService: RevisionRequestCollectionService,
    protected revisionRequestDataService: RevisionRequestDataService,
    private store: Store<IvtState>
  ) {
    super(revisionRequestCollecitonService, revisionRequestDataService);
  }
}

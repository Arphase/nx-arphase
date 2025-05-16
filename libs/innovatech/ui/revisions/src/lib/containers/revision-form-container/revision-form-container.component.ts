import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui/forms';
import { filterNil } from '@arphase/ui/utils';
import { Revision, UserRoles } from '@innovatech/common/domain';
import { selectQueryParam } from '@innovatech/ui/core/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { fromVehicles, getVehiclesErrorMessageState, getVehiclesVehicleState } from '@innovatech/ui/vehicles/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { omit } from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { createRevisionForm } from '../../components/revision-form/revision-form.component';
import { isRevisionEditable } from '../../pipes/editable-revision.pipe';
import { RevisionCollectionService } from '../../services/revision-collection.service';

@UntilDestroy()
@Component({
  selector: 'ivt-revision-form-container',
  templateUrl: './revision-form-container.component.html',
  styleUrls: ['./revision-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RevisionFormContainerComponent extends ApsFormContainerComponent<Revision> implements OnInit, OnDestroy {
  form = createRevisionForm();
  createSuccessMessage = 'La revisión se ha creado';
  updateSuccessMessage = 'La revisión se ha actualizado';
  successUrl = '/spa/revisions';
  isEditable$ = combineLatest([
    this.permissionService.hasCreatePermission([UserRoles.superAdmin, UserRoles.repairman]),
    this.permissionService.hasUpdatePermission([UserRoles.superAdmin]),
    this.route.url,
    this.currentItem$,
  ]).pipe(
    map(([create, update, url, revision]) => {
      const createRoute = url.find(segment => segment.path === 'new');
      return createRoute ? create : update && isRevisionEditable(revision);
    }),
  );
  vehicle$ = this.store.pipe(select(getVehiclesVehicleState));
  error$ = this.store.pipe(select(getVehiclesErrorMessageState));

  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private store: Store,
    private permissionService: PermissionService,
    private route: ActivatedRoute,
  ) {
    super(revisionCollectionService, router, messageService);
  }

  ngOnInit() {
    this.store
      .pipe(select(selectQueryParam('vehicleVin')), untilDestroyed(this), filterNil())
      .subscribe(vin => this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin: String(vin) })));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  submit(item: Revision): void {
    super.submit(omit({ ...item, vehicleId: item.vehicle.id }, 'vehicle') as Revision);
  }

  ngOnDestroy() {
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

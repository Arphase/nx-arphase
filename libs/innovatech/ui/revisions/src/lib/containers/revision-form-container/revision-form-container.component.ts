import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Revision, UserRoles } from '@innovatech/common/domain';
import { filterNil } from '@innovatech/common/utils';
import { selectQueryParam } from '@innovatech/ui/core/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import {
  fromVehicles,
  getVehiclesErrorMessageState,
  getVehiclesVehicleState,
  VehicleCollectionService,
} from '@innovatech/ui/vehicles/data';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { omit } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { createRevisionForm } from '../../components/revision-form/revision-form.component';
import { RevisionCollectionService } from '../../services/revision-collection.service';

@UntilDestroy()
@Component({
  selector: 'ivt-revision-form-container',
  templateUrl: './revision-form-container.component.html',
  styleUrls: ['./revision-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionFormContainerComponent extends IvtFormContainerComponent<Revision> implements OnInit, OnDestroy {
  form = createRevisionForm();
  createSuccessMessage = 'La revisión se ha creado con éxito';
  updateSuccessMessage = 'La revisión se ha actualizado con éxito';
  successUrl = '/spa/revisions';
  isEditable$ = combineLatest([
    this.permissionService.hasCreatePermission([UserRoles.superAdmin, UserRoles.repairman]),
    this.permissionService.hasUpdatePermission([UserRoles.superAdmin]),
    this.route.url,
  ]).pipe(
    map(([create, update, url]) => {
      const createRoute = url.find(segment => segment.path === 'new');
      return createRoute ? create : update;
    })
  );
  vehicle$ = this.vehicleCollectionService.currentItem$;
  currentVehicle$ = this.store.pipe(select(getVehiclesVehicleState));
  error$ = this.store.pipe(select(getVehiclesErrorMessageState));

  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private store: Store,
    private vehicleCollectionService: VehicleCollectionService,
    private permissionService: PermissionService,
    private route: ActivatedRoute
  ) {
    super(revisionCollectionService, router, messageService);
  }

  ngOnInit() {
    this.store
      .pipe(select(selectQueryParam('vehicleId')), untilDestroyed(this), filterNil())
      .subscribe(id => this.vehicleCollectionService.getByKey(Number(id)));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  submit(item: Revision): void {
    super.submit(omit({ ...item, vehicleId: item.vehicle.id }, 'vehicle') as Revision);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

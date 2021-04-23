import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RevisionRequest, UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import {
  fromVehicles,
  getAuthUserCompanyIdState,
  getVehiclesErrorState,
  getVehiclesVehicleState,
  IvtState,
  PermissionService,
  RevisionRequestCollectionService,
  selectQueryParam,
  VehicleCollectionService,
} from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { omit } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

import { createRevisionRequestForm } from '../../components/revision-request-form/revision-request-form.component';

@Component({
  selector: 'ivt-revision-request-form-container',
  templateUrl: './revision-request-form-container.component.html',
  styleUrls: ['./revision-request-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestFormContainerComponent
  extends IvtFormContainerComponent<RevisionRequest>
  implements OnInit, OnDestroy {
  form = createRevisionRequestForm();
  companyId$ = this.store.pipe(select(getAuthUserCompanyIdState));
  vehicle$ = this.vehicleCollectionService.currentItem$;
  currentVehicle$ = this.store.pipe(select(getVehiclesVehicleState));
  isEditable$ = this.permissionService.hasUpdatePermission([UserRoles.agencyUser]);
  error$ = this.store.pipe(select(getVehiclesErrorState));
  createSuccessMessage = 'La solicitud para la revisión de tu vehículo se ha creado con éxito';
  updateSuccessMessage = 'La solicitud para la revisión de tu vehículo se ha actualizado con éxito';
  successUrl = '/spa/revision-requests';

  constructor(
    protected revisionRequestCollectionService: RevisionRequestCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private store: Store<IvtState>,
    private vehicleCollectionService: VehicleCollectionService,
    private permissionService: PermissionService
  ) {
    super(revisionRequestCollectionService, router, messageService);
  }

  ngOnInit() {
    this.store
      .pipe(select(selectQueryParam('vehicleId')), takeUntil(this.destroy$), filterNil())
      .subscribe(id => this.vehicleCollectionService.getByKey(Number(id)));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  submit(item: RevisionRequest): void {
    super.submit(omit({ ...item, vehicleId: item.vehicle.id }, 'vehicle') as RevisionRequest);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpStatusCodes } from '@arphase/common';
import { ApsFormContainerComponent } from '@arphase/ui/forms';
import { UserRoles, Vehicle } from '@innovatech/common/domain';
import { getAuthUserCompanyIdState } from '@innovatech/ui/auth/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import {
  fromVehicles,
  getVehiclesErrorState,
  getVehiclesVehicleState,
  VehicleCollectionService,
} from '@innovatech/ui/vehicles/data';
import { createVehicleForm } from '@innovatech/ui/vehicles/ui';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ivt-vehicle-form-container',
  templateUrl: './vehicle-form-container.component.html',
  styleUrls: ['./vehicle-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormContainerComponent extends ApsFormContainerComponent<Vehicle> implements OnDestroy {
  form = createVehicleForm();
  successUrl = '/spa/vehicles';
  createSuccessMessage = 'El vehículo se ha creado';
  updateSuccessMessage = 'El vehículo se ha actualizado';
  companyId$ = this.store.pipe(select(getAuthUserCompanyIdState));
  showCompanyInput$ = this.permissionService.hasCreatePermission([UserRoles.superAdmin, UserRoles.repairman]);
  isEditable$ = combineLatest([
    this.permissionService.hasCreatePermission([UserRoles.superAdmin, UserRoles.agencyUser, UserRoles.repairman]),
    this.permissionService.hasUpdatePermission([UserRoles.superAdmin]),
    this.route.url,
  ]).pipe(
    map(([create, update, url]) => {
      const createRoute = url.find(segment => segment.path === 'new');
      return createRoute ? create : update;
    })
  );
  invalidVin$ = combineLatest([
    this.store.pipe(select(getVehiclesVehicleState)),
    this.store.pipe(select(getVehiclesErrorState)),
  ]).pipe(
    map(([vehicle, error]) => {
      return !!vehicle || error?.statusCode === HttpStatusCodes.Forbidden;
    })
  );

  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private store: Store,
    private permissionService: PermissionService,
    private route: ActivatedRoute
  ) {
    super(vehicleCollectionService, router, messageService);
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  ngOnDestroy() {
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpStatusCodes } from '@arphase/common';
import { ApsFormContainerComponent } from '@arphase/ui/forms';
import { filterNil } from '@arphase/ui/utils';
import { UserRoles, Vehicle } from '@innovatech/common/domain';
import { fromAuth } from '@innovatech/ui/auth/data';
import { CompanyCollectionService } from '@innovatech/ui/companies/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import {
  fromVehicles,
  getVehiclesErrorState,
  getVehiclesVehicleState,
  VehicleCollectionService,
} from '@innovatech/ui/vehicles/data';
import { createVehicleForm } from '@innovatech/ui/vehicles/ui';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest, firstValueFrom } from 'rxjs';
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
  companyId = toSignal(this.store.select(fromAuth.selectors.getAuthUserCompanyIdState));
  products = toSignal(this.productCollectionService.entities$);
  showCompanyInput = toSignal(this.permissionService.hasCreatePermission([UserRoles.superAdmin, UserRoles.repairman]));
  isEditable = toSignal(
    combineLatest([
      this.permissionService.hasCreatePermission([UserRoles.superAdmin, UserRoles.agencyUser, UserRoles.repairman]),
      this.permissionService.hasUpdatePermission([UserRoles.superAdmin]),
      this.route.url,
    ]).pipe(map(([create, update, url]) => (url.find(segment => segment.path === 'new') ? create : update))),
  );
  invalidVin = toSignal(
    combineLatest([
      this.store.pipe(select(getVehiclesVehicleState)),
      this.store.pipe(select(getVehiclesErrorState)),
      this.vehicleCollectionService.currentItem$,
    ]).pipe(
      map(
        ([vehicle, error, editingVehicle]) =>
          (!!vehicle && vehicle.vin !== editingVehicle.vin) || error?.statusCode === HttpStatusCodes.Forbidden,
      ),
    ),
  );
  groupId = toSignal(
    this.companyCollectionService.currentItem$.pipe(
      filterNil(),
      map(({ groupId }) => groupId),
    ),
  );

  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private store: Store,
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private companyCollectionService: CompanyCollectionService,
    private productCollectionService: ProductCollectionService,
  ) {
    super(vehicleCollectionService, router, messageService);
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  async getVehicleProducts(vehicle: Partial<Vehicle>): Promise<void> {
    await firstValueFrom(this.companyCollectionService.getByKey(vehicle.companyId));
    this.productCollectionService.getWithQuery({
      sort: [{ key: 'product.name', value: 'ascend' }] as unknown as string[],
      year: vehicle.year,
      horsePower: vehicle.horsePower,
      groupId: String(this.groupId()),
      resetList: String(true),
    });
  }

  ngOnDestroy(): void {
    this.productCollectionService.clearCache();
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

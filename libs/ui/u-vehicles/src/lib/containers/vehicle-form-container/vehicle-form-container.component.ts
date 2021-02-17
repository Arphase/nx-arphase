import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles, Vehicle } from '@ivt/c-data';
import { filterExisting } from '@ivt/c-utils';
import {
  CompanyCollectionService,
  fromVehicles,
  getAuthUserCompanyIdState,
  getAuthUserRoleState,
  getVehiclesVehicleState,
  IvtState,
  VehicleCollectionService,
} from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, take } from 'rxjs/operators';

import { createVehicleForm } from '../../public';

@Component({
  selector: 'ivt-vehicle-form-container',
  templateUrl: './vehicle-form-container.component.html',
  styleUrls: ['./vehicle-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormContainerComponent extends IvtFormContainerComponent<Vehicle> implements OnInit, OnDestroy {
  form = createVehicleForm();
  successUrl = '/spa/vehicles';
  createSuccessMessage = 'El vehículo se ha creado con éxito';
  updateSuccessMessage = 'El vehículo se ha actualizado con éxito';
  companyId$ = this.store.pipe(select(getAuthUserCompanyIdState));
  showCompanyInput$ = this.store.pipe(
    select(getAuthUserRoleState),
    map(role => role === UserRoles[UserRoles.superAdmin])
  );
  companyOptions$ = this.companyCollectionService.options$;
  invalidVin$ = this.store.pipe(
    select(getVehiclesVehicleState),
    map(vehicle => !!vehicle)
  );

  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private store: Store<IvtState>,
    private companyCollectionService: CompanyCollectionService
  ) {
    super(vehicleCollectionService, router, messageService);
  }

  ngOnInit() {
    this.showCompanyInput$
      .pipe(filterExisting(), take(1))
      .subscribe(() => this.companyCollectionService.getWithQuery({}));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, UserRoles, Vehicle } from '@innovatech/common/domain';
import { filterExisting } from '@innovatech/common/utils';
import { getAuthUserCompanyIdState } from '@innovatech/ui/auth/data';
import { IvtEntityCollection } from '@innovatech/ui/core/data';
import {
  fromVehicles,
  getVehiclesErrorState,
  getVehiclesVehicleState,
  VehicleCollectionService,
} from '@innovatech/ui/vehicles/data';
import { createVehicleForm } from '@innovatech/ui/vehicles/ui';
import { CompanyCollectionService, PermissionService } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { QueryParams } from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

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
  companyOptions$ = this.companyCollectionService.options$;
  companiesInfo$ = this.companyCollectionService.store.pipe(
    select(this.companyCollectionService.selectors.selectCollection),
    map((collection: IvtEntityCollection<Company>) => collection.info)
  );
  invalidVin$ = combineLatest([
    this.store.pipe(select(getVehiclesVehicleState)),
    this.store.pipe(select(getVehiclesErrorState)),
  ]).pipe(
    map(([vehicle, error]) => {
      return !!vehicle || error?.statusCode === 403;
    })
  );

  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private store: Store,
    private companyCollectionService: CompanyCollectionService,
    private permissionService: PermissionService,
    private route: ActivatedRoute
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

  getCompanies(queryParams: QueryParams): void {
    this.companyCollectionService.getWithQuery({
      ...queryParams,
      sort: [{ key: 'company.businessName', value: 'ascend' } as any],
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

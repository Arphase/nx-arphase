import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guarantee, UserRoles } from '@ivt/c-data';
import { filterExisting, filterNil } from '@ivt/c-utils';
import {
  CompanyCollectionService,
  fromVehicles,
  getAuthUserCompanyIdState,
  getAuthUserRoleState,
  getVehiclesErrorState,
  getVehiclesVehicleState,
  GuaranteeCollectionService,
  IvtState,
  PermissionService,
  ProductCollectionService,
  selectQueryParam,
  VehicleCollectionService,
} from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { omit } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, take, takeUntil } from 'rxjs/operators';

import { createGuaranteeForm } from '../../components/guarantee-form/guarantee-form.component';

@Component({
  selector: 'ivt-guarantee-form-container',
  templateUrl: './guarantee-form-container.component.html',
  styleUrls: ['./guarantee-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormContainerComponent extends IvtFormContainerComponent<Guarantee> implements OnInit, OnDestroy {
  form = createGuaranteeForm();
  successUrl = '/spa/guarantees';
  createSuccessMessage = 'La garantía se ha creado con éxito';
  updateSuccessMessage = 'La garantía se ha actualizado con éxito';
  isEditable$ = this.permissionService.hasUpdatePermission([UserRoles.superAdmin, UserRoles.agencyUser]);
  productOptions$ = this.productCollectionService.options$;
  companyId$ = this.store.pipe(select(getAuthUserCompanyIdState));
  vehicle$ = this.vehicleCollectionService.currentItem$;
  showCompanyInput$ = this.store.pipe(
    select(getAuthUserRoleState),
    map(role => role === UserRoles[UserRoles.superAdmin])
  );
  companyOptions$ = this.companyCollectionService.options$;
  currentVehicle$ = this.store.pipe(select(getVehiclesVehicleState));
  error$ = this.store.pipe(select(getVehiclesErrorState));

  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private productCollectionService: ProductCollectionService,
    private permissionService: PermissionService,
    private store: Store<IvtState>,
    private companyCollectionService: CompanyCollectionService,
    private vehicleCollectionService: VehicleCollectionService
  ) {
    super(guaranteeCollectionService, router, messageService);
  }

  ngOnInit() {
    this.showCompanyInput$.pipe(take(1), filterExisting()).subscribe(() => {
      this.companyCollectionService.getWithQuery({});
    });

    this.store
      .pipe(select(selectQueryParam('vehicleId')), takeUntil(this.destroy$), filterNil())
      .subscribe(id => this.vehicleCollectionService.getByKey(Number(id)));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  submit(item: Guarantee): void {
    super.submit(omit({ ...item, vehicleId: item.vehicle.id }, 'vehicle'));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

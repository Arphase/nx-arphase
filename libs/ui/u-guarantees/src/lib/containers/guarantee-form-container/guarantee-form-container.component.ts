import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guarantee, UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import {
  CompanyCollectionService,
  fromVehicles,
  getAuthUserCompanyIdState,
  getAuthUserRoleState,
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
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest } from 'rxjs';
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
  disabledCompanyInput$ = this.store.pipe(
    select(getAuthUserRoleState),
    map(role => role !== UserRoles[UserRoles.superAdmin])
  );
  companyOptions$ = combineLatest([
    this.disabledCompanyInput$,
    this.companyCollectionService.currentItem$,
    this.companyCollectionService.options$,
  ]).pipe(
    map(([disabledCompanyInput, currentItem, options]) => {
      if (disabledCompanyInput) {
        return currentItem ? [{ label: currentItem.businessName, value: currentItem.id }] : [];
      } else {
        return options;
      }
    })
  );
  currentVehicle$ = this.store.pipe(select(getVehiclesVehicleState));

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
    combineLatest([this.disabledCompanyInput$, this.companyId$])
      .pipe(take(1))
      .subscribe(([disabledCompanyInput, companyId]) => {
        if (disabledCompanyInput) {
          this.companyCollectionService.getByKey(companyId);
        } else {
          this.companyCollectionService.getWithQuery({});
        }
      });

    this.store
      .pipe(select(selectQueryParam('vehicleId')), takeUntil(this.destroy$), filterNil())
      .subscribe(id => this.vehicleCollectionService.getByKey(Number(id)));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

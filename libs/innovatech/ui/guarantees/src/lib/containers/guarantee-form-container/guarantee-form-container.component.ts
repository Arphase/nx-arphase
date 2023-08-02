import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui/forms';
import { filterNil } from '@arphase/ui/utils';
import { Guarantee, UserRoles } from '@innovatech/common/domain';
import { CompanyCollectionService } from '@innovatech/ui/companies/data';
import { selectQueryParam } from '@innovatech/ui/core/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import { fromVehicles, getVehiclesErrorMessageState, getVehiclesVehicleState } from '@innovatech/ui/vehicles/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { omit } from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { createGuaranteeForm } from '../../components/guarantee-form/guarantee-form.constants';
import { GuaranteeCollectionService } from '../../services/guarantee-collection.service';

@UntilDestroy()
@Component({
  selector: 'ivt-guarantee-form-container',
  templateUrl: './guarantee-form-container.component.html',
  styleUrls: ['./guarantee-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormContainerComponent extends ApsFormContainerComponent<Guarantee> implements OnInit, OnDestroy {
  form = createGuaranteeForm();
  successUrl = '/spa/guarantees';
  createSuccessMessage = 'La garantía se ha creado';
  updateSuccessMessage = 'La garantía se ha actualizado';
  showCompanyInput$ = this.permissionService.hasCreatePermission([UserRoles.superAdmin]);
  isEditable$ = combineLatest([
    this.permissionService.hasCreatePermission([UserRoles.superAdmin, UserRoles.agencyUser]),
    this.permissionService.hasUpdatePermission([UserRoles.superAdmin]),
    this.route.url,
  ]).pipe(map(([create, update, url]) => (url.find(segment => segment.path === 'new') ? create : update)));
  productOptions$ = this.productCollectionService.options$;
  vehicle$ = this.store.pipe(select(getVehiclesVehicleState));
  error$ = this.store.pipe(select(getVehiclesErrorMessageState));
  groupId$ = this.companyCollectionService.currentItem$.pipe(
    filterNil(),
    map(({ groupId }) => groupId)
  );

  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private productCollectionService: ProductCollectionService,
    private permissionService: PermissionService,
    private store: Store,
    private route: ActivatedRoute,
    private companyCollectionService: CompanyCollectionService
  ) {
    super(guaranteeCollectionService, router, messageService);
    this.productCollectionService.clearCache();
  }

  ngOnInit() {
    this.store
      .pipe(select(selectQueryParam('vehicleVin')), untilDestroyed(this))
      .subscribe(vin => this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin })));

    this.vehicle$
      .pipe(untilDestroyed(this), filterNil())
      .subscribe(vehicle => this.companyCollectionService.getByKey(vehicle.companyId));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  submit(item: Guarantee): void {
    super.submit(omit({ ...item, vehicleId: item.vehicle.id }, 'vehicle') as Guarantee);
  }

  ngOnDestroy() {
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
    this.productCollectionService.clearCache();
  }
}

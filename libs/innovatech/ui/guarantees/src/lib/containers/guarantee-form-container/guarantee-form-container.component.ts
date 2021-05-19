import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guarantee, UserRoles } from '@innovatech/common/domain';
import { filterNil } from '@innovatech/common/utils';
import { selectQueryParam } from '@innovatech/ui/core/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { ProductCollectionService } from '@innovatech/ui/products/data';
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

import { createGuaranteeForm } from '../../components/guarantee-form/guarantee-form.component';
import { GuaranteeCollectionService } from '../../services/guarantee-collection.service';

@UntilDestroy()
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
  isEditable$ = combineLatest([
    this.permissionService.hasCreatePermission([UserRoles.superAdmin, UserRoles.agencyUser]),
    this.permissionService.hasUpdatePermission([UserRoles.superAdmin]),
    this.route.url,
  ]).pipe(
    map(([create, update, url]) => {
      const createRoute = url.find(segment => segment.path === 'new');
      return createRoute ? create : update;
    })
  );
  showCompanyInput$ = this.permissionService.hasCreatePermission([UserRoles.superAdmin]);
  productOptions$ = this.productCollectionService.options$;
  vehicle$ = this.vehicleCollectionService.currentItem$;
  currentVehicle$ = this.store.pipe(select(getVehiclesVehicleState));
  error$ = this.store.pipe(select(getVehiclesErrorMessageState));

  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private productCollectionService: ProductCollectionService,
    private permissionService: PermissionService,
    private store: Store,
    private vehicleCollectionService: VehicleCollectionService,
    private route: ActivatedRoute
  ) {
    super(guaranteeCollectionService, router, messageService);
    this.productCollectionService.clearCache();
  }

  ngOnInit() {
    this.store
      .pipe(select(selectQueryParam('vehicleId')), untilDestroyed(this), filterNil())
      .subscribe(id => this.vehicleCollectionService.getByKey(Number(id)));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  submit(item: Guarantee): void {
    super.submit(omit({ ...item, vehicleId: item.vehicle.id }, 'vehicle') as Guarantee);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
    this.productCollectionService.clearCache();
  }
}

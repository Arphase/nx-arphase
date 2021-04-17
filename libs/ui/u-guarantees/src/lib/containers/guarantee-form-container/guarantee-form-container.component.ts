import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, Guarantee, UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import {
  CompanyCollectionService,
  fromVehicles,
  getAuthUserCompanyIdState,
  getVehiclesErrorState,
  getVehiclesVehicleState,
  GuaranteeCollectionService,
  IvtEntityCollection,
  IvtState,
  PermissionService,
  ProductCollectionService,
  selectQueryParam,
  VehicleCollectionService,
} from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { QueryParams } from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { omit } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

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
  productOptions$ = this.productCollectionService.options$;
  companyId$ = this.store.pipe(select(getAuthUserCompanyIdState));
  vehicle$ = this.vehicleCollectionService.currentItem$;
  companyOptions$ = this.companyCollectionService.options$;
  companiesInfo$ = this.companyCollectionService.store.pipe(
    select(this.companyCollectionService.selectors.selectCollection),
    map((collection: IvtEntityCollection<Company>) => collection.info)
  );
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
    private vehicleCollectionService: VehicleCollectionService,
    private route: ActivatedRoute
  ) {
    super(guaranteeCollectionService, router, messageService);
  }

  ngOnInit() {
    this.productCollectionService.getWithQuery({ resetList: String(true) });
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

  getCompanies(queryParams: QueryParams): void {
    this.companyCollectionService.getWithQuery(queryParams);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

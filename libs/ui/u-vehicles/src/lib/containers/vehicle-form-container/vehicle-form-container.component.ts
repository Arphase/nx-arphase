import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles, Vehicle } from '@ivt/c-data';
import {
  CompanyCollectionService,
  getAuthUserCompanyIdState,
  getAuthUserRoleState,
  IvtState,
  VehicleCollectionService,
} from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'ivt-vehicle-form-container',
  templateUrl: './vehicle-form-container.component.html',
  styleUrls: ['./vehicle-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormContainerComponent extends IvtFormContainerComponent<Vehicle> implements OnInit {
  successUrl = '/spa/vehicles';
  createSuccessMessage = 'El vehículo se ha creado con éxito';
  updateSuccessMessage = 'El vehículo se ha actualizado con éxito';
  companyId$ = this.store.pipe(select(getAuthUserCompanyIdState));
  loading$ = this.vehicleCollectionService.loading$;
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

  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected router: Router,
    protected toastr: ToastrService,
    private store: Store<IvtState>,
    private companyCollectionService: CompanyCollectionService
  ) {
    super(vehicleCollectionService, router, toastr);
  }

  ngOnInit() {
    combineLatest([this.disabledCompanyInput$, this.companyId$])
      .pipe(take(1))
      .subscribe(([disabledCompanyInput, companyId]) => {
        if (disabledCompanyInput) {
          this.companyCollectionService.getByKey(companyId);
        } else {
          this.companyCollectionService.getAll();
        }
      });
  }
}

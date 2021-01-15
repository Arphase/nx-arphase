import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guarantee, UserRoles } from '@ivt/c-data';
import {
  CompanyCollectionService,
  getAuthUserCompanyIdState,
  getAuthUserRoleState,
  GuaranteeCollectionService,
  IvtState,
  PermissionService,
  ProductCollectionService,
} from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'ivt-guarantee-form-container',
  templateUrl: './guarantee-form-container.component.html',
  styleUrls: ['./guarantee-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormContainerComponent extends IvtFormContainerComponent<Guarantee> implements OnInit {
  successUrl = '/spa/guarantees';
  createSuccessMessage = 'La garantía se ha creado con éxito';
  updateSuccessMessage = 'La garantía se ha actualizado con éxito';
  isEditable$ = this.permissionService.hasUpdatePermission();
  productOptions$ = this.productCollectionService.options$;
  companyId$ = this.store.pipe(select(getAuthUserCompanyIdState));
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
    protected guaranteeCollectionService: GuaranteeCollectionService,
    protected router: Router,
    protected toastr: ToastrService,
    private productCollectionService: ProductCollectionService,
    private permissionService: PermissionService,
    private store: Store<IvtState>,
    private companyCollectionService: CompanyCollectionService
  ) {
    super(guaranteeCollectionService, router, toastr);
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

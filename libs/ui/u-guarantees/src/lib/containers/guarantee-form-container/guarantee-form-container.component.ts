import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guarantee, UserRoles } from '@ivt/c-data';
import {
  CompanyCollectionService,
  getAuthUserRoleState,
  GuaranteeCollectionService,
  IvtState,
  PermissionService,
  ProductCollectionService,
} from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ivt-guarantee-form-container',
  templateUrl: './guarantee-form-container.component.html',
  styleUrls: ['./guarantee-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormContainerComponent extends IvtFormContainerComponent<Guarantee> {
  successUrl = '/spa/guarantees';
  createSuccessMessage = 'La garantía se ha creado con éxito';
  updateSuccessMessage = 'La garantía se ha actualizado con éxito';
  isEditable$ = this.permissionService.hasUpdatePermission();
  productOptions$ = this.productCollectionService.options$;
  companyOptions$ = this.companyCollectionService.options$;
  canSelectCompany$ = this.store.pipe(
    select(getAuthUserRoleState),
    map(role => role === UserRoles.agencyUser)
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

  getCompanies(): void {
    this.companyCollectionService.getAll();
  }
}

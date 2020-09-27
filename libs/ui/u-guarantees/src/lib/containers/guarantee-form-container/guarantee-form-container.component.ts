import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guarantee } from '@ivt/c-data';
import { GuaranteeCollectionService, PermissionService, PermissionTypes } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { ToastrService } from 'ngx-toastr';

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
  isEditable$ = this.permissionService.hasUpdatePermission(...[PermissionTypes.Guarantees]);

  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService,
    protected router: Router,
    protected toastr: ToastrService,
    private permissionService: PermissionService
  ) {
    super(guaranteeCollectionService, router, toastr);
  }
}

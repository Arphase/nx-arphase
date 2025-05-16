import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui/forms';
import { filterNil } from '@arphase/ui/utils';
import { RevisionRequest, UserRoles } from '@innovatech/common/domain';
import { getAuthUserCompanyIdState } from '@innovatech/ui/auth/data';
import { selectQueryParam } from '@innovatech/ui/core/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { fromVehicles, getVehiclesErrorMessageState, getVehiclesVehicleState } from '@innovatech/ui/vehicles/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { omit } from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createRevisionRequestForm } from '../../components/revision-request-form/revision-request-form.component';
import { RevisionRequestCollectionService } from '../../services/revision-request-collection.service';

@UntilDestroy()
@Component({
  selector: 'ivt-revision-request-form-container',
  templateUrl: './revision-request-form-container.component.html',
  styleUrls: ['./revision-request-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RevisionRequestFormContainerComponent
  extends ApsFormContainerComponent<RevisionRequest>
  implements OnInit, OnDestroy
{
  form = createRevisionRequestForm();
  companyId$ = this.store.pipe(select(getAuthUserCompanyIdState));
  vehicle$ = this.store.pipe(select(getVehiclesVehicleState));
  isEditable$ = this.permissionService.hasUpdatePermission([UserRoles.agencyUser]);
  error$ = this.store.pipe(select(getVehiclesErrorMessageState));
  createSuccessMessage = 'La solicitud para la revisión de tu vehículo se ha creado';
  updateSuccessMessage = 'La solicitud para la revisión de tu vehículo se ha actualizado';
  successUrl = '/spa/revision-requests';

  constructor(
    protected revisionRequestCollectionService: RevisionRequestCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private store: Store,
    private permissionService: PermissionService,
  ) {
    super(revisionRequestCollectionService, router, messageService);
  }

  ngOnInit() {
    this.store
      .pipe(select(selectQueryParam('vehicleVin')), untilDestroyed(this), filterNil())
      .subscribe(vin => this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin: String(vin) })));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  submit(item: RevisionRequest): void {
    super.submit(omit({ ...item, vehicleId: item.vehicle.id }, 'vehicle') as RevisionRequest);
  }

  ngOnDestroy() {
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

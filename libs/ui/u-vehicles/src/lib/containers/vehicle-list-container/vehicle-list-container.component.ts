import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles, Vehicle } from '@ivt/c-data';
import { IdentityFilterService, PermissionService, VehicleCollectionService, VehicleDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'ivt-vehicle-list-container',
  templateUrl: './vehicle-list-container.component.html',
  styleUrls: ['./vehicle-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleListContainerComponent extends IvtListContainerComponent<Vehicle> implements OnInit {
  canCreateReviewRequest$ = this.permissionsService.hasUpdatePermission([UserRoles.agencyUser]);
  canManageRevisions$ = this.permissionsService.hasUpdatePermission([UserRoles.superAdmin]);
  groupOptions$ = this.identityFilterService.groupOptions$;
  companyOptions$ = this.identityFilterService.companyOptions$;
  userOptions$ = this.identityFilterService.userOptions$;

  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected vehicleDataService: VehicleDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService,
    protected router: Router,
    protected permissionsService: PermissionService,
    private identityFilterService: IdentityFilterService
  ) {
    super(vehicleCollectionService, vehicleDataService, modal, messageService);
  }

  ngOnInit() {
    this.identityFilterService.getItems();
  }

  deleteItem(item: Vehicle): void {
    const { model, year, vin } = item;
    this.deleteConfirmMessage = `¿Desea eliminar el vehículo ${model} ${year} con número de serie ${vin}?`;
    this.deleteSuccessMessage = `El vehículo ${model} ${year} con número de serie ${vin} ha sido eliminado`;
    super.deleteItem(item);
  }

  createGuarantee(item: Vehicle): void {
    this.router.navigateByUrl(`/spa/guarantees/new?vehicleId=${item.id}`);
  }

  createRevision(item: Vehicle): void {
    this.router.navigateByUrl(`/spa/revisions/new?vehicleId=${item.id}`);
  }

  createRevisionRequest(item: Vehicle): void {
    this.router.navigateByUrl(`/spa/revision-requests/new?vehicleId=${item.id}`);
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles, Vehicle } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import {
  CompanyCollectionService,
  getAuthUserRoleState,
  GroupCollectionService,
  IvtState,
  PermissionService,
  UserCollectionService,
  VehicleCollectionService,
  VehicleDataService,
} from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-vehicle-list-container',
  templateUrl: './vehicle-list-container.component.html',
  styleUrls: ['./vehicle-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleListContainerComponent extends IvtListContainerComponent<Vehicle> implements OnInit {
  canCreateReviewRequest$ = this.permissionsService.hasUpdatePermission([UserRoles.agencyUser]);
  canManageRevisions$ = this.permissionsService.hasUpdatePermission([UserRoles.superAdmin]);
  groupOptions$ = this.groupCollectionService.options$;
  companyOptions$ = this.companyCollectionService.options$;
  userOptions$ = this.userCollectionService.options$;

  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected vehicleDataService: VehicleDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService,
    protected router: Router,
    protected permissionsService: PermissionService,
    private groupCollectionService: GroupCollectionService,
    private companyCollectionService: CompanyCollectionService,
    private userCollectionService: UserCollectionService,
    private store: Store<IvtState>
  ) {
    super(vehicleCollectionService, vehicleDataService, modal, messageService);
  }

  ngOnInit() {
    this.store.pipe(select(getAuthUserRoleState), filterNil(), takeUntil(this.destroy$)).subscribe(role => {
      if (role === UserRoles[UserRoles.superAdmin]) {
        this.companyCollectionService.getWithQuery({});
        this.groupCollectionService.getWithQuery({});
      }
      this.userCollectionService.getWithQuery({});
    });
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

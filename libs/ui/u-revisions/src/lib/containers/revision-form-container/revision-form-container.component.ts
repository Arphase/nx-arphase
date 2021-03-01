import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Revision, UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import {
  fromVehicles,
  getAuthUserRoleState,
  getVehiclesErrorState,
  getVehiclesVehicleState,
  IvtState,
  RevisionCollectionService,
  selectQueryParam,
  VehicleCollectionService,
} from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { omit } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, takeUntil } from 'rxjs/operators';

import { createRevisionForm } from '../../components/revision-form/revision-form.component';

@Component({
  selector: 'ivt-revision-form-container',
  templateUrl: './revision-form-container.component.html',
  styleUrls: ['./revision-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionFormContainerComponent extends IvtFormContainerComponent<Revision> implements OnInit, OnDestroy {
  form = createRevisionForm();
  createSuccessMessage = 'La revisión se ha creado con éxito';
  updateSuccessMessage = 'La revisión se ha actualizado con éxito';
  successUrl = '/spa/revisions';
  isEditable$ = this.store.pipe(
    select(getAuthUserRoleState),
    map(role => UserRoles[role] === UserRoles.superAdmin)
  );
  vehicle$ = this.vehicleCollectionService.currentItem$;
  currentVehicle$ = this.store.pipe(select(getVehiclesVehicleState));
  error$ = this.store.pipe(select(getVehiclesErrorState));

  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private store: Store<IvtState>,
    private vehicleCollectionService: VehicleCollectionService
  ) {
    super(revisionCollectionService, router, messageService);
  }

  ngOnInit() {
    this.store
      .pipe(select(selectQueryParam('vehicleId')), takeUntil(this.destroy$), filterNil())
      .subscribe(id => this.vehicleCollectionService.getByKey(Number(id)));
  }

  verifyVin(vin: string): void {
    this.store.dispatch(fromVehicles.actions.getVehicleByVin({ vin }));
  }

  submit(item: Revision): void {
    super.submit(omit({ ...item, vehicleId: item.vehicle.id }, 'vehicle'));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.vehicleCollectionService.removeOneFromCache(null);
    this.store.dispatch(fromVehicles.actions.clearVehiclesState());
  }
}

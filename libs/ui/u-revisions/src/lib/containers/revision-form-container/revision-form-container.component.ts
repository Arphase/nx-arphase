import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Revision } from '@ivt/c-data';
import { IvtState, RevisionCollectionService, selectRouteParam } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-revision-form-container',
  templateUrl: './revision-form-container.component.html',
  styleUrls: ['./revision-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionFormContainerComponent extends IvtFormContainerComponent<Revision> implements OnInit {
  createSuccessMessage = 'Se ha creado la revisión';
  updateSuccessMessage = 'Se ha actualizado la revisión';

  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected router: Router,
    protected toastr: ToastrService,
    private store: Store<IvtState>
  ) {
    super(revisionCollectionService, router, toastr);
  }

  ngOnInit() {
    this.store
      .pipe(select(selectRouteParam('id')), takeUntil(this.destroy$))
      .subscribe(vehicleId => (this.successUrl = `/spa/vehicles/${vehicleId}/revisions`));
  }

  submit(item: Revision): void {
    this.store
      .pipe(select(selectRouteParam('id')))
      .pipe(take(1))
      .subscribe(vehicleId => super.submit({ ...item, vehicleId: Number(vehicleId) }));
  }
}
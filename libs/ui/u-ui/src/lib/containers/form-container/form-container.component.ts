import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IvtCollectionService } from '@ivt/u-state';
import { EntityActionOptions, EntityOp, ofEntityOp } from '@ngrx/data';
import { get } from 'lodash-es';
import { ToastrService } from 'ngx-toastr';
import { filter, mapTo, takeUntil } from 'rxjs/operators';

import { IvtSubscriberComponent } from '../../components';
import { ComponentCanDeactivate } from '../../guards/dirty-form/dirty-form.guard';

@Component({
  selector: 'ivt-form-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtFormContainerComponent<T> extends IvtSubscriberComponent implements ComponentCanDeactivate {
  loading$ = this.entityCollectionService.loadingModify$;
  currentItem$ = this.entityCollectionService.currentItem$;
  showSuccess$ = this.entityCollectionService.entityActions$.pipe(
    ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS, EntityOp.SAVE_UPDATE_ONE_SUCCESS),
    mapTo(true)
  );
  successUrl: string;
  createSuccessMessage: string;
  updateSuccessMessage: string;
  form: FormGroup;

  constructor(
    protected entityCollectionService: IvtCollectionService<T>,
    @Optional() protected router?: Router,
    @Optional() protected toastr?: ToastrService
  ) {
    super();
    this.entityCollectionService.entityActions$
      .pipe(
        ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS, EntityOp.SAVE_UPDATE_ONE_SUCCESS),
        filter(() => !!this.successUrl && !!this.router),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.router.navigateByUrl(this.successUrl));

    this.entityCollectionService.entityActions$
      .pipe(
        ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS),
        filter(() => !!this.createSuccessMessage && !!this.toastr),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.toastr.success(this.createSuccessMessage));

    this.entityCollectionService.entityActions$
      .pipe(
        ofEntityOp(EntityOp.SAVE_UPDATE_ONE_SUCCESS),
        filter(() => !!this.updateSuccessMessage && !!this.toastr),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.toastr.success(this.updateSuccessMessage));
  }

  canDeactivate(): boolean {
    return !this.form.touched;
  }

  submit(item: T, entityActionOptions: EntityActionOptions = {}): void {
    this.form.markAsUntouched();
    get(item, 'id')
      ? this.entityCollectionService.update(item, entityActionOptions)
      : this.entityCollectionService.add(item, entityActionOptions);
  }
}

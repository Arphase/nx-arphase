import { ChangeDetectionStrategy, Component, Optional, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IvtCollectionService } from '@ivt/u-state';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { get } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { filter, mapTo, takeUntil } from 'rxjs/operators';

import { IvtFormComponent, IvtSubscriberComponent } from '../../components';
import { ComponentCanDeactivate } from '../../guards/dirty-form/dirty-form.guard';

@Component({
  selector: 'ivt-form-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtFormContainerComponent<T> extends IvtSubscriberComponent implements ComponentCanDeactivate {
  @ViewChild('form', { static: false }) formComponent: IvtFormComponent<T>;
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
    @Optional() protected messageService?: NzMessageService,
    @Optional() protected modalRef?: NzModalRef
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
        ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS, EntityOp.SAVE_UPDATE_ONE_SUCCESS),
        filter(() => !!this.modalRef),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.modalRef.close());

    this.entityCollectionService.entityActions$
      .pipe(
        ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS),
        filter(() => !!this.createSuccessMessage && !!this.messageService),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.messageService.success(this.createSuccessMessage));

    this.entityCollectionService.entityActions$
      .pipe(
        ofEntityOp(EntityOp.SAVE_UPDATE_ONE_SUCCESS),
        filter(() => !!this.updateSuccessMessage && !!this.messageService),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.messageService.success(this.updateSuccessMessage));

    this.entityCollectionService.loadingModify$
      .pipe(
        filter(() => !!this.modalRef),
        takeUntil(this.destroy$)
      )
      .subscribe(loading => this.modalRef.updateConfig({ nzOkLoading: loading }));
  }

  canDeactivate(): boolean {
    return !this.form.touched;
  }

  submitChild(): boolean {
    this.formComponent.submit();
    return false;
  }

  submit(item: T): void {
    this.form?.markAsUntouched();
    get(item, 'id')
      ? this.entityCollectionService.update(item, { isOptimistic: false })
      : this.entityCollectionService.add(item, { isOptimistic: false });
  }
}

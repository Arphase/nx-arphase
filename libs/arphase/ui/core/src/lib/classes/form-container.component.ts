import { Component, Input, Optional, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

import { ComponentCanDeactivate } from '../guards/dirty-form/dirty-form.guard';
import { ApsCollectionService } from '../services/collection.service';
import { ApsFormComponent } from './form.component';

@UntilDestroy()
@Component({
  selector: 'aps-form-container',
  template: '',
})
export class ApsFormContainerComponent<T = any> implements ComponentCanDeactivate {
  @ViewChild('form', { static: false }) formComponent: ApsFormComponent<T>;
  @Input() item: T;
  @Input() form: UntypedFormGroup | UntypedFormArray;
  loading$ = this.entityCollectionService.loadingModify$ || of();
  currentItem$ = this.entityCollectionService.currentItem$ || of();
  showSuccess$ = (this.entityCollectionService.entityActions$ || of()).pipe(
    ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS, EntityOp.SAVE_UPDATE_ONE_SUCCESS),
    mapTo(true)
  );
  successUrl: string;
  createSuccessMessage: string;
  updateSuccessMessage: string;

  constructor(
    @Optional() protected entityCollectionService: ApsCollectionService<T>,
    @Optional() protected router?: Router,
    @Optional() protected messageService?: NzMessageService,
    @Optional() protected modalRef?: NzModalRef
  ) {
    if (this.entityCollectionService.entityActions$) {
      this.entityCollectionService.entityActions$
        .pipe(
          ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS, EntityOp.SAVE_UPDATE_ONE_SUCCESS),
          filter(() => !!this.successUrl && !!this.router),
          untilDestroyed(this)
        )
        .subscribe(() => this.router.navigateByUrl(this.successUrl));

      this.entityCollectionService.entityActions$
        .pipe(
          ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS, EntityOp.SAVE_UPDATE_ONE_SUCCESS),
          filter(() => !!this.modalRef),
          untilDestroyed(this)
        )
        .subscribe(() => this.modalRef.close());

      this.entityCollectionService.entityActions$
        .pipe(
          ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS),
          filter(() => !!this.createSuccessMessage && !!this.messageService),
          untilDestroyed(this)
        )
        .subscribe(() => this.messageService.success(this.createSuccessMessage));

      this.entityCollectionService.entityActions$
        .pipe(
          ofEntityOp(EntityOp.SAVE_UPDATE_ONE_SUCCESS),
          filter(() => !!this.updateSuccessMessage && !!this.messageService),
          untilDestroyed(this)
        )
        .subscribe(() => this.messageService.success(this.updateSuccessMessage));
    }

    if (this.entityCollectionService.loadingModify$) {
      this.entityCollectionService.loadingModify$
        .pipe(
          filter(() => !!this.modalRef),
          untilDestroyed(this)
        )
        .subscribe(loading => this.modalRef.updateConfig({ nzOkLoading: loading }));
    }
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
    item['id']
      ? this.entityCollectionService.update(item, { isOptimistic: false })
      : this.entityCollectionService.add(item, { isOptimistic: false });
  }
}

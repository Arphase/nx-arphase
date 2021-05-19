import { ChangeDetectionStrategy, Component, Optional, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IvtCollectionService } from '@innovatech/ui/core/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { get } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

import { IvtFormComponent } from '../../components';
import { ComponentCanDeactivate } from '../../guards/dirty-form/dirty-form.guard';

@UntilDestroy()
@Component({
  selector: 'ivt-form-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtFormContainerComponent<T = any> implements ComponentCanDeactivate {
  @ViewChild('form', { static: false }) formComponent: IvtFormComponent<T>;
  loading$ = this.entityCollectionService.loadingModify$ || of();
  currentItem$ = this.entityCollectionService.currentItem$ || of();
  showSuccess$ = (this.entityCollectionService.entityActions$ || of()).pipe(
    ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS, EntityOp.SAVE_UPDATE_ONE_SUCCESS),
    mapTo(true)
  );
  successUrl: string;
  createSuccessMessage: string;
  updateSuccessMessage: string;
  form: FormGroup;

  constructor(
    @Optional() protected entityCollectionService: IvtCollectionService<T>,
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
    get(item, 'id')
      ? this.entityCollectionService.update(item, { isOptimistic: false })
      : this.entityCollectionService.add(item, { isOptimistic: false });
  }
}

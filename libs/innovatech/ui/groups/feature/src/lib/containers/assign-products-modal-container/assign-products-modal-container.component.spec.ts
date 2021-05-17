import { ProductCollectionService } from '@innovatech/ui/products/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { AssignProductsModalContainerComponent } from './assign-products-modal-container.component';

describe('AssignProductsModalContainerComponent', () => {
  let actions$ = new Observable<Action>();
  let spectator: Spectator<AssignProductsModalContainerComponent>;
  const createComponent = createComponentFactory({
    component: AssignProductsModalContainerComponent,
    shallow: true,
    providers: [provideMockStore(), provideMockActions(() => actions$)],
    mocks: [ProductCollectionService, NzModalRef, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

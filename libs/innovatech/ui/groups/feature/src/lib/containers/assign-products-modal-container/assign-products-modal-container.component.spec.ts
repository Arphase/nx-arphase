import { ProductCollectionService } from '@innovatech/ui/products/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { AssignProductsModalContainerComponent } from './assign-products-modal-container.component';

describe('AssignProductsModalContainerComponent', () => {
  let spectator: Spectator<AssignProductsModalContainerComponent>;
  const actions$ = new Observable<Action>();

  const createComponent = createComponentFactory({
    component: AssignProductsModalContainerComponent,
    shallow: true,
    providers: [
      provideMockStore(),
      provideMockActions(() => actions$),
      { provide: NZ_MODAL_DATA, useValue: { groupId: 1 } },
    ],
    mocks: [ProductCollectionService, NzModalRef, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

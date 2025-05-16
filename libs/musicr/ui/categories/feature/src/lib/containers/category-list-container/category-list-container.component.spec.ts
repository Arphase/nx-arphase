import { CategoryCollectionService, CategoryDataService } from '@musicr/ui/categories/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

import { CategoryListContainerComponent } from './category-list-container.component';

describe('CategoryListContainerComponent', () => {
  let spectator: Spectator<CategoryListContainerComponent>;
  const actions$ = new Observable<Action>();

  const createComponent = createComponentFactory({
    component: CategoryListContainerComponent,
    providers: [provideMockStore(), provideMockActions(() => actions$)],
    mocks: [CategoryCollectionService, CategoryDataService, NzModalService, NzMessageService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

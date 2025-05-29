import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DeepPartial } from '@arphase/common';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { CategoryCollectionService, CategoryDataService, fromCategories } from '@musicr/ui/categories/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@UntilDestroy()
@Component({
  selector: 'mrl-category-list-container',
  templateUrl: './category-list-container.component.html',
  styleUrls: ['./category-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CategoryListContainerComponent extends ApsListContainerComponent<Category> implements OnInit {
  constructor(
    protected categoryCollectionService: CategoryCollectionService,
    protected categoryDataService: CategoryDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService,
    private store: Store,
    private actions$: Actions,
  ) {
    super(categoryCollectionService, categoryDataService, modal, messageService);
  }

  ngOnInit() {
    this.actions$
      .pipe(ofType(fromCategories.actions.saveCategoriesOrderSuccess), untilDestroyed(this))
      .subscribe(() => {
        this.messageService.success('Los productos del grupo se han actualizado');
        this.filterItems({ sort: [{ key: 'category.position', value: 'ascend' }] as unknown as string[] });
      });
  }

  deleteItem(item: Category): void {
    const { name } = item;
    this.deleteConfirmMessage = `¿Desea eliminar la categoría ${name}?`;
    this.deleteSuccessMessage = `La categoría ${name} se ha eliminado`;
    super.deleteItem(item);
  }

  saveCategoriesOrder(items: DeepPartial<Category>[]): void {
    const categories = items.map(({ id }, position) => ({ id, position }));
    this.store.dispatch(fromCategories.actions.saveCategoriesOrder({ categories }));
  }
}

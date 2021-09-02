import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { CategoryCollectionService, CategoryDataService } from '@musicr/ui/categories/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'mrl-category-list-container',
  templateUrl: './category-list-container.component.html',
  styleUrls: ['./category-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListContainerComponent extends ApsListContainerComponent<Category> {
  constructor(
    protected categoryCollectionService: CategoryCollectionService,
    protected categoryDataService: CategoryDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService
  ) {
    super(categoryCollectionService, categoryDataService, modal, messageService);
  }

  deleteItem(item: Category): void {
    const { name } = item;
    this.deleteConfirmMessage = `¿Desea eliminar la categoría ${name}?`;
    this.deleteSuccessMessage = `La categoría ${name} se ha eliminado`;
    super.deleteItem(item);
  }
}

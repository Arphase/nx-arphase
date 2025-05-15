import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Category, Subcategory } from '@musicr/domain';
import { SubcategoryCollectionService, SubcategoryDataService } from '@musicr/ui/subcategories/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'mrl-subcategory-list-container',
    templateUrl: './subcategory-list-container.component.html',
    styleUrls: ['./subcategory-list-container.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SubcategoryListContainerComponent extends ApsListContainerComponent<Subcategory> {
  constructor(
    protected subcategoryCollectionService: SubcategoryCollectionService,
    protected subcategoryDataService: SubcategoryDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService
  ) {
    super(subcategoryCollectionService, subcategoryDataService, modal, messageService);
  }

  deleteItem(item: Category): void {
    const { name } = item;
    this.deleteConfirmMessage = `¿Desea eliminar la subcategoría ${name}?`;
    this.deleteSuccessMessage = `La subcategoría ${name} se ha eliminado`;
    super.deleteItem(item);
  }
}

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DeepPartial, moveItemInArray } from '@arphase/common';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Category } from '@musicr/domain';

@Component({
    selector: 'mrl-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CategoryListComponent extends ApsListComponent<Category> implements OnChanges {
  categories: DeepPartial<Category[]> = [];
  sortMode: boolean;
  columns: ApsColumns = [
    {
      label: '#',
      prop: 'category.position',
      colSizes: {
        xs: 4,
        sm: 4,
        md: 2,
        lg: 2,
      },
    },
    {
      label: 'Nombre',
      prop: 'category.name',
      colSizes: {
        xs: 20,
        sm: 20,
        md: 7,
        lg: 9,
      },
    },
    {
      label: 'Descripción',
      prop: 'category.description',
      colSizes: {
        md: 15,
        lg: 13,
      },
    },
  ];
  @Output() saveCategoriesOrder = new EventEmitter<DeepPartial<Category>[]>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.list) {
      this.categories = this.list;
    }
  }

  categoryMoved(event: CdkDragDrop<Category[]>): void {
    this.categories = moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  }

  onSaveCategoriesOrder(): void {
    this.saveCategoriesOrder.emit(this.categories);
    this.sortMode = false;
  }
}

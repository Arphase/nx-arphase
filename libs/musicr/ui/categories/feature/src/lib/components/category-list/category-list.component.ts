import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Category } from '@musicr/domain';

@Component({
  selector: 'mrl-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent extends ApsListComponent<Category> {
  columns: ApsColumns = [
    {
      label: 'Nombre',
      prop: 'category.name',
      colSizes: {
        xs: 24,
        md: 9,
        lg: 9,
      },
    },
    {
      label: 'Descripción',
      prop: 'category.description',
      colSizes: {
        md: 15,
        lg: 15,
      },
    },
  ];
}

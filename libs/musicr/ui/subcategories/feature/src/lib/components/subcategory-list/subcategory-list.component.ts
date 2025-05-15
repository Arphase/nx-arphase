import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Subcategory } from '@musicr/domain';

@Component({
    selector: 'mrl-subcategory-list',
    templateUrl: './subcategory-list.component.html',
    styleUrls: ['./subcategory-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SubcategoryListComponent extends ApsListComponent<Subcategory> {
  columns: ApsColumns = [
    {
      label: 'Nombre',
      prop: 'subcategory.name',
      colSizes: {
        xs: 24,
        md: 6,
        lg: 6,
      },
    },
    {
      label: 'Categoría',
      prop: 'category.name',
      colSizes: {
        md: 6,
        lg: 6,
      },
    },
    {
      label: 'Descripción',
      prop: 'subcategory.description',
      colSizes: {
        md: 12,
        lg: 12,
      },
    },
  ];
}

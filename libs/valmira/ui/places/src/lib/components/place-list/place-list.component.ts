import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui';
import { Place, PlaceCategories } from '@valmira/domain';

@Component({
  selector: 'vma-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceListComponent extends ApsListComponent<Place> {
  columns: ApsColumns = [
    {
      label: 'Nombre',
      prop: 'place.name',
      colSizes: {
        xs: 24,
        md: 8,
        lg: 4,
      },
    },
    {
      label: 'Descripción',
      prop: 'place.description',
      colSizes: { lg: 6 },
    },
    {
      label: 'Capacidad',
      prop: 'place.capacity',
      colSizes: { lg: 3 },
    },
    {
      label: 'Cuartos',
      prop: 'place.rooms',
      colSizes: {
        md: 5,
        lg: 3,
      },
    },
    {
      label: 'Camas',
      prop: 'place.beds',
      colSizes: {
        md: 4,
        lg: 3,
      },
    },
    {
      label: 'Categoría',
      prop: 'category.name',
      colSizes: {
        md: 7,
        lg: 5,
      },
    },
  ];

  categoryLabels: Record<string, string> = {
    [PlaceCategories[PlaceCategories.premium]]: 'Premium',
    [PlaceCategories[PlaceCategories.couple]]: 'Pareja',
    [PlaceCategories[PlaceCategories.kids]]: 'Niños',
  };
}

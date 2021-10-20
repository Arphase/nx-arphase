import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Place } from '@valmira/domain';

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
        md: 6,
      },
    },
    {
      label: 'Capacidad',
      prop: 'place.capacity',
      colSizes: { md: 5 },
    },
    {
      label: 'Cuartos',
      prop: 'place.rooms',
      colSizes: {
        md: 5,
      },
    },
    {
      label: 'Camas',
      prop: 'place.beds',
      colSizes: {
        md: 8,
      },
    },
  ];
}

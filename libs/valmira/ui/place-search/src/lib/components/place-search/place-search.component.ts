import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListComponent } from '@arphase/ui/core';
import { Place } from '@valmira/domain';

@Component({
  selector: 'vma-place-search',
  templateUrl: './place-search.component.html',
  styleUrls: ['./place-search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceSearchComponent extends ApsListComponent<Place> {}
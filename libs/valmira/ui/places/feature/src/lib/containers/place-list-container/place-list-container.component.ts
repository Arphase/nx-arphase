import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Place } from '@valmira/domain';
import { PlaceCollectionService, PlaceDataService } from '@valmira/ui/places/data';

@Component({
  selector: 'vma-place-list-container',
  templateUrl: './place-list-container.component.html',
  styleUrls: ['./place-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceListContainerComponent extends ApsListContainerComponent<Place> {
  constructor(protected placeCollectionService: PlaceCollectionService, protected placeDataService: PlaceDataService) {
    super(placeCollectionService, placeDataService);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui';
import { Place } from '@valmira/domain';
import { PlaceCollectionService } from '../../services/place-collection.service';
import { PlaceDataService } from '../../services/place-data.service';

@Component({
  selector: 'vma-place-list-container',
  templateUrl: './place-list-container.component.html',
  styleUrls: ['./place-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceListContainerComponent extends ApsListContainerComponent<Place> {
  constructor(
    protected placeCollectionService: PlaceCollectionService,
    protected placeDataService: PlaceDataService
  ) {
    super(placeCollectionService, placeDataService);
  }
}

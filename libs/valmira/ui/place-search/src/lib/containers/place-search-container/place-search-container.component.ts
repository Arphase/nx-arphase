import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Place } from '@valmira/domain';
import { PlaceCollectionService, PlaceDataService } from '@valmira/ui/places/data';

@Component({
  selector: 'vma-place-search-container',
  templateUrl: './place-search-container.component.html',
  styleUrls: ['./place-search-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceSearchContainerComponent extends ApsListContainerComponent<Place> implements OnInit {
  constructor(protected placeCollectionService: PlaceCollectionService, placeDataService: PlaceDataService) {
    super(placeCollectionService, placeDataService);
  }

  ngOnInit() {
    this.placeCollectionService.getWithQuery({});
  }
}

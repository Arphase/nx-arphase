import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApsQueryParams } from '@arphase/common';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Store } from '@ngrx/store';
import { Place } from '@valmira/domain';
import { PlaceCollectionService, PlaceDataService } from '@valmira/ui/places/data';

@Component({
  selector: 'vma-place-search-container',
  templateUrl: './place-search-container.component.html',
  styleUrls: ['./place-search-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PlaceSearchContainerComponent extends ApsListContainerComponent<Place> implements OnInit {
  constructor(
    protected placeCollectionService: PlaceCollectionService,
    protected placeDataService: PlaceDataService,
    private store: Store,
  ) {
    super(placeCollectionService, placeDataService);
  }

  ngOnInit() {
    const params = { pageSize: String(50), onlyActives: String(true) };
    this.placeCollectionService.getWithQuery(params);
  }

  filterItems(queryParams?: ApsQueryParams): void {
    const params: ApsQueryParams = {
      ...this.queryParams,
      ...queryParams,
      resetList: String(true),
    };
    this.placeCollectionService.getWithQuery(params);
  }
}

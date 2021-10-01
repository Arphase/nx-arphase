import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApsListContainerComponent, filterNil } from '@arphase/ui/core';
import { QueryParams } from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Place } from '@valmira/domain';
import { fromPlaces, PlaceCollectionService, PlaceDataService } from '@valmira/ui/places/data';
import { keyBy } from 'lodash';
import { map } from 'rxjs';

@Component({
  selector: 'vma-place-search-container',
  templateUrl: './place-search-container.component.html',
  styleUrls: ['./place-search-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceSearchContainerComponent extends ApsListContainerComponent<Place> implements OnInit {
  summary$ = this.store.pipe(
    select(fromPlaces.selectors.getPlacesCategorySummary),
    filterNil(),
    map(summary => keyBy(summary, 'category'))
  );
  constructor(
    protected placeCollectionService: PlaceCollectionService,
    protected placeDataService: PlaceDataService,
    private store: Store
  ) {
    super(placeCollectionService, placeDataService);
  }

  ngOnInit() {
    this.placeCollectionService.getWithQuery({});
    this.store.dispatch(fromPlaces.actions.getCategorySummary({ params: {} }));
  }

  filterItems(queryParams?: QueryParams): void {
    const params: QueryParams = {
      ...this.queryParams,
      ...queryParams,
      resetList: String(true),
    };
    this.store.dispatch(fromPlaces.actions.getCategorySummary({ params }));
    this.placeCollectionService.getWithQuery(params);
  }
}

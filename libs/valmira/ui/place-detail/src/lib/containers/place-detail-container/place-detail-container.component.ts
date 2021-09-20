import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { fromPlaces, PlaceCollectionService } from '@valmira/ui/places/data';
import { filter, map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'vma-place-detail-container',
  templateUrl: './place-detail-container.component.html',
  styleUrls: ['./place-detail-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceDetailContainerComponent implements OnInit {
  item$ = this.placeCollectionService.currentItem$;
  loading$ = this.placeCollectionService.loading$;
  occupedDates$ = this.store.pipe(select(fromPlaces.selectors.getPlacesOccupiedDates));

  constructor(
    private placeCollectionService: PlaceCollectionService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.placeCollectionService.removeOneFromCache(null);
    this.route.paramMap
      .pipe(
        untilDestroyed(this),
        filter(params => !!params.get('id')),
        map(params => params.get('id'))
      )
      .subscribe(id => {
        this.placeCollectionService.getByKey(id);
        this.store.dispatch(fromPlaces.actions.getOccupiedDates({ id: Number(id) }));
      });
  }
}

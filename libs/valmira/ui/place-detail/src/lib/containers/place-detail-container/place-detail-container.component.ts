import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filterNil } from '@arphase/ui/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { fromPlaces, PlaceCollectionService } from '@valmira/ui/places/data';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { getReservationPreview } from '../../state/place-detail.actions';
import { getPlaceDetailReservationPreview } from '../../state/place-detail.selectors';

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
  loadingReserve$ = this.reservationCollectionService.loadingModify$;
  occupedDates$ = this.store.pipe(select(fromPlaces.selectors.getPlacesOccupiedDates));
  reservationPreview$ = this.store.pipe(select(getPlaceDetailReservationPreview));

  constructor(
    private reservationCollectionService: ReservationCollectionService,
    private placeCollectionService: PlaceCollectionService,
    private route: ActivatedRoute,
    private router: Router,
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

  datesChange(payload: { startDate: Date; endDate: Date }): void {
    this.item$
      .pipe(take(1))
      .subscribe(({ id }) => this.store.dispatch(getReservationPreview({ reservation: { ...payload, placeId: id } })));
  }

  submit(payload: { startDate: Date; endDate: Date }): void {
    this.item$
      .pipe(
        take(1),
        switchMap(place => this.reservationCollectionService.add({ placeId: place.id, ...payload })),
        switchMap(() => this.reservationCollectionService.currentItem$),
        filterNil()
      )
      .subscribe(({ id }) => this.router.navigateByUrl(`reservation/${id}`));
  }
}

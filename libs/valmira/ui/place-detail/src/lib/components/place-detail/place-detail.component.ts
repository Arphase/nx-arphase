import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { categoryLabels, Place, Reservation } from '@valmira/domain';
import dayjs from 'dayjs';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { filter } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'vma-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceDetailComponent
  extends ApsFormComponent<{ startDate: Date; endDate: Date }>
  implements OnInit, OnChanges
{
  @ViewChild('endDateCalendar', { static: true }) endDateCalendar: NzDatePickerComponent;
  @Input() place: Place;
  @Input() loading: boolean;
  @Input() startDateOccupedDates: string[] = [];
  @Input() endDateOccupiedDates: string[] = [];
  @Input() loadingReserve: boolean;
  @Input() reservationPreview: Reservation;
  @Input() queryParams: Record<string, string>;
  lat = 25.131905;
  lng = -99.932679;
  form = new FormGroup(
    {
      startDate: new FormControl(null, ApsValidators.required),
      endDate: new FormControl(null, ApsValidators.required),
    },
    { validators: ApsValidators.dateLessThan('startDate', 'endDate') }
  );
  categoryLabels = categoryLabels;
  @Output() datesChange = new EventEmitter<{ startDate: Date; endDate: Date }>();

  constructor() {
    super();
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        filter(value => !!value.startDate && !!value.endDate)
      )
      .subscribe(value => this.datesChange.emit(value));
  }

  ngOnInit() {
    this.form
      .get('startDate')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => {
        this.endDateCalendar.open();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.queryParams && this.queryParams?.startDate && this.queryParams?.endDate) {
      this.form.patchValue({
        startDate: dayjs(this.queryParams.startDate, 'DD-MM-YYYY').toDate(),
        endDate: dayjs(this.queryParams.endDate, 'DD-MM-YYYY').toDate(),
      });
    }
  }

  disableStartDate = (startValue: Date): boolean => {
    const date = dayjs(startValue);
    if (startValue.getTime() < new Date().getTime()) {
      return true;
    }
    if (this.place?.releaseDate) {
      if (startValue.getTime() <= dayjs(this.place.releaseDate).subtract(1, 'day').toDate().getTime()) {
        return true;
      }
    }
    if (this.startDateOccupedDates.find(occupeiedDate => date.isSame(occupeiedDate, 'day'))) {
      return true;
    }
    if (this.values?.endDate) {
      return startValue.getTime() > this.values.endDate.getTime();
    }
    return false;
  };

  disableEndDate = (endValue: Date): boolean => {
    const date = dayjs(endValue);
    if (endValue.getTime() < new Date().getTime()) {
      return true;
    }
    if (this.place?.releaseDate) {
      if (endValue.getTime() <= dayjs(this.place.releaseDate).subtract(1, 'day').toDate().getTime()) {
        return true;
      }
    }
    if (this.endDateOccupiedDates.find(occupeiedDate => date.isSame(occupeiedDate, 'day'))) {
      return true;
    }
    if (this.values?.startDate) {
      const startDate = this.values.startDate;
      const nextOccupedDate = this.endDateOccupiedDates.find(occupeiedDate =>
        dayjs(occupeiedDate).subtract(1, 'day').isAfter(startDate, 'day')
      );
      return (
        endValue.getTime() <= startDate.getTime() ||
        (nextOccupedDate ? endValue.getTime() > new Date(nextOccupedDate).getTime() : false)
      );
    }
    return false;
  };
}

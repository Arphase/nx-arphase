import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { categoryLabels, Place, Reservation } from '@valmira/domain';
import dayjs from 'dayjs';
import { filter } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'vma-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceDetailComponent extends ApsFormComponent<{ startDate: Date; endDate: Date }> implements OnChanges {
  @Input() place: Place;
  @Input() loading: boolean;
  @Input() occupedDates: string[] = [];
  @Input() loadingReserve: boolean;
  @Input() reservationPreview: Reservation;
  @Input() queryParams: Record<string, string>;
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
    if (this.occupedDates.find(occupeiedDate => date.isSame(occupeiedDate, 'day'))) {
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
    if (this.occupedDates.find(occupeiedDate => date.isSame(occupeiedDate, 'day'))) {
      return true;
    }
    if (this.values?.startDate) {
      const startDate = this.values.startDate;
      const nextOccupedDate = this.occupedDates.find(occupeiedDate =>
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

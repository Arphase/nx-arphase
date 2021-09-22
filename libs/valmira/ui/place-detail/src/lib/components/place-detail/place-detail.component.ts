import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { Place } from '@valmira/domain';
import dayjs from 'dayjs';

@Component({
  selector: 'vma-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceDetailComponent extends ApsFormComponent<{ startDate: Date; endDate: Date }> {
  @Input() place: Place;
  @Input() loading: boolean;
  @Input() occupedDates: string[] = [];
  @Input() loadingReserve: boolean;
  form = new FormGroup(
    {
      startDate: new FormControl(null, ApsValidators.required),
      endDate: new FormControl(null, ApsValidators.required),
    },
    { validators: ApsValidators.dateLessThan('startDate', 'endDate') }
  );

  disableStartDate = (startValue: Date): boolean => {
    const date = dayjs(startValue);
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

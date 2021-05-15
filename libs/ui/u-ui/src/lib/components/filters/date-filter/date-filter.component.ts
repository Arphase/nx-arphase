import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@innovatech/common/utils';
import dayjs from 'dayjs';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { tap } from 'rxjs/operators';

export interface Dates {
  startDate: string;
  endDate: string;
  dateType: string;
}

@Component({
  selector: 'ivt-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IvtDateFilterComponent implements OnChanges {
  @Input() dateTypeOptions: NzSelectOptionInterface[] = [];
  @Input() currentDates: Dates;
  @Input() label: string;
  startDate = '';
  endDate = '';
  dateType = '';
  showError = false;
  control: FormGroup;
  mappedTitle: string;
  @Output() filterItems = new EventEmitter<Dates>();

  constructor(private fb: FormBuilder) {
    this.control = this.fb.group(
      {
        dateType: null,
        startDate: null,
        endDate: null,
      },
      {
        validators: (control: AbstractControl) => {
          const { startDate, endDate, dateType } = control.value;
          const selectedBothDates = !!startDate && !!endDate;
          const mustSelectDateType = this.dateTypeOptions.length > 0;
          const selectedDateType = mustSelectDateType ? !!dateType : true;
          return selectedBothDates && selectedDateType ? null : { error: true };
        },
      }
    );

    this.control.valueChanges
      .pipe(
        tap(({ startDate, endDate, dateType }) => {
          this.startDate = formatDate(startDate);
          this.endDate = formatDate(endDate);
          this.dateType = dateType;
          this.setFilter();
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.label) {
      this.mappedTitle = this.label;
    }

    if (
      changes.currentDates &&
      changes.currentDates.firstChange &&
      this.currentDates?.startDate &&
      this.currentDates?.endDate
    ) {
      const { startDate, endDate, dateType } = this.currentDates;
      this.control.get('startDate').patchValue(dayjs(startDate, 'DD/MM/YY').toDate(), {
        emitEvent: false,
      });
      this.control.get('endDate').patchValue(dayjs(endDate, 'DD/MM/YY').toDate(), {
        emitEvent: false,
      });
      this.control.get('dateType').patchValue(dateType, { emitEvent: false });
      this.startDate = startDate;
      this.endDate = endDate;
      this.dateType = dateType;
      this.mappedTitle = `${this.startDate} - ${this.endDate}`;
    }
  }

  get showActiveStatus(): boolean {
    return this.control.valid;
  }

  setFilter(): void {
    const startDateValue = this.control.get('startDate').value;
    const endDateValue = this.control.get('endDate').value;

    this.showError = dayjs(startDateValue).isAfter(endDateValue);

    if (this.showError) {
      return;
    }

    if (this.control.valid) {
      this.mappedTitle = `${this.startDate} - ${this.endDate}`;

      this.filterItems.emit({
        startDate: this.startDate,
        endDate: this.endDate,
        dateType: this.dateType,
      });
    } else {
      this.mappedTitle = this.label;
    }
  }

  deleteFilters(): void {
    this.control.reset();
    this.startDate = '';
    this.endDate = '';
    this.dateType = '';
    this.setFilter();
    this.mappedTitle = this.label;
    this.filterItems.emit({
      startDate: '',
      endDate: '',
      dateType: '',
    });
  }
}

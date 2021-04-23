import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-radio-filter',
  templateUrl: './radio-filter.component.html',
  styleUrls: ['./radio-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtRadioFilterComponent implements OnChanges, OnDestroy {
  @Input() options: NzSelectOptionInterface[] = [];
  @Input() label: string;
  @Input() selectedOption: string | number;
  @Output() filterCleared = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<string>();
  @Output() filterItems = new EventEmitter<string>();
  control = new FormControl();
  mappedTitle: string;
  active: boolean;
  private destroy$ = new Subject<void>();

  constructor() {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.setTitle(value);
      this.filterItems.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedOption && this.selectedOption) {
      this.control.patchValue(this.selectedOption);
      this.active = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setTitle(value: string): void {
    const radioOption = this.options.find(option => option.value === value);
    this.mappedTitle = radioOption ? (radioOption.label as string) : this.label;
  }

  deleteFilters(): void {
    this.control.reset('');
    this.filterItems.emit('');
    this.filterCleared.emit();
    this.active = false;
  }
}

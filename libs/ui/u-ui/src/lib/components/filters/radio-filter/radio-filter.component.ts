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
import { FormBuilder } from '@angular/forms';
import { Select } from '@ivt/c-data';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IvtFilterComponent } from '../filter';

@Component({
  selector: 'ivt-radio-filter',
  templateUrl: './radio-filter.component.html',
  styleUrls: ['./radio-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtRadioFilterComponent extends IvtFilterComponent<string> implements OnChanges, OnDestroy {
  @Input() options: Select[] = [];
  @Input() selectedOption: string | number;
  @Output() filterCleared = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<string>();
  control = this.fb.control('');
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    super();
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
    this.mappedTitle = radioOption ? radioOption.label : this.label;
  }

  deleteFilters(): void {
    this.control.reset('');
    this.filterItems.emit('');
    this.filterCleared.emit();
    this.active = false;
  }
}

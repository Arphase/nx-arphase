import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IvtFilterComponent } from '../filter';
import { Select } from '@ivt/c-data';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-radio-filter',
  templateUrl: './radio-filter.component.html',
  styleUrls: ['./radio-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtRadioFilterComponent extends IvtFilterComponent
  implements OnInit, OnDestroy {
  @Input() options: Select[] = [];
  @Output() filterItems = new EventEmitter<string>();
  @Output() filterCleared = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<string>();
  control = this.fb.control('');
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.setTitle(value);
        this.filterItems.emit(value);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setTitle(value: string): void {
    const radioOption = this.options.find((option) => option.value === value);
    this.mappedTitle = radioOption ? radioOption.label : this.label;
  }

  deleteFilters(): void {
    this.control.reset('');
    this.filterItems.emit('');
    this.filterCleared.emit();
  }
}

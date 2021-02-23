import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { QueryParams } from '@ngrx/data';

import { IvtFilterComponent } from '../filter';

export interface CheckboxOption {
  label: string;
  value: number;
  checked?: boolean;
  visible?: boolean;
}

@Component({
  selector: 'ivt-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IvtCheckboxFilterComponent extends IvtFilterComponent<number[]> implements OnChanges {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @Input() options: CheckboxOption[] = [];
  @Input() searchable: boolean;
  @Input() disabled: boolean;
  @Input() height = '25vh';
  @Input() preselectedOptions: string;
  @Input() loading: boolean;
  @Input() last: boolean;
  @Input() pageIndex: string;
  localOptions: CheckboxOption[] = [];
  text: string;
  @Output() filterOptions = new EventEmitter<QueryParams>();

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  get hasActiveOptions(): boolean {
    return this.localOptions?.some(option => option.checked);
  }

  get hasVisibleOptions(): boolean {
    return !!this.localOptions.find(option => option.visible);
  }

  get visibleOptions(): CheckboxOption[] {
    return this.localOptions.filter(option => option.visible);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && this.options) {
      this.localOptions = this.mergeOptions(this.options, this.localOptions);
    }

    if (changes.preselectedOptions && this.preselectedOptions) {
      const optionsArray = this.preselectedOptions.split(',').map(option => Number(option));
      this.localOptions = this.localOptions.map(option => {
        if (optionsArray.includes(option.value)) {
          return { ...option, checked: true };
        } else {
          return option;
        }
      });
      this.setlocalOptions();
    }
  }

  setTitle(selectedValues: string[]): void {
    this.mappedTitle = selectedValues.length === 0 ? this.label : selectedValues.join(', ');
    this.mappedTitle = this.mappedTitle.length > 25 ? `${this.mappedTitle.substring(0, 25)}...` : this.mappedTitle;
  }

  onFilterChange(event: CheckboxOption[]): void {
    this.localOptions = this.localOptions.map(option => {
      if (
        event
          .filter(eventOption => eventOption.checked)
          .map(eventOption => eventOption.value)
          .includes(option.value)
      ) {
        return { ...option, checked: true };
      } else {
        return option;
      }
    });
    this.setlocalOptions();
  }

  setlocalOptions(): void {
    const localOptions = this.localOptions.filter(option => option.checked);
    const selectedValues = localOptions.map(option => option.value);
    const selectedLabels = localOptions.map(option => option.label);
    this.setTitle(selectedLabels);
    this.filterItems.emit(selectedValues);
  }

  deleteFilters(): void {
    this.localOptions = this.localOptions.map(option => ({ ...option, checked: false }));
    this.mappedTitle = this.label;
    this.filterItems.emit([]);
    this.cdr.detectChanges();
  }

  filterOptionsText(text: string): void {
    this.text = text;
    this.localOptions = this.localOptions.map(option => ({ ...option, visible: this.showOption(option) }));
    this.filterOptions.emit({ text, pageIndex: '1' });
  }

  showOption(option: CheckboxOption): boolean {
    return !this.text || option.label.includes(this.text);
  }

  mergeOptions(options: CheckboxOption[], localOptions: CheckboxOption[]): CheckboxOption[] {
    const localOptionsValues = localOptions.map(option => option.value);
    return [...localOptions, ...options.filter(option => !localOptionsValues.includes(option.value))].map(option => ({
      ...option,
      visible: this.showOption(option),
    }));
  }

  nextBatch(): void {
    if (this.loading || this.last) {
      return;
    }

    const { end } = this.viewport.getRenderedRange();
    const total = this.viewport.getDataLength();

    if (end === total && end > 0 && total > 0) {
      this.filterOptions.emit({ pageIndex: String(Number(this.pageIndex + 1)) });
    }
  }
}

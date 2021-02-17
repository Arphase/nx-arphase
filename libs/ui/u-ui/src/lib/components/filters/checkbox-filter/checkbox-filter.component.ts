import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { IvtFilterComponent } from '../filter';

export interface CheckboxOption {
  label: string;
  value: number;
  checked?: boolean;
}

@Component({
  selector: 'ivt-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IvtCheckboxFilterComponent extends IvtFilterComponent<number[]> implements OnChanges {
  @Input() options: CheckboxOption[] = [];
  @Input() searchable: boolean;
  @Input() disabled: boolean;
  @Input() height = '15vh';
  @Input() width = '275px';
  @Input() preselectedOptions: string;
  selectedOptions: CheckboxOption[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  get activeOptions(): boolean {
    return this.selectedOptions?.some(option => option.checked);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && this.options) {
      this.selectedOptions = [...this.options];
    }

    if (changes.preselectedOptions && this.preselectedOptions) {
      const optionsArray = this.preselectedOptions.split(',').map(option => Number(option));
      this.selectedOptions = this.selectedOptions.map(option => {
        if (optionsArray.includes(option.value)) {
          return { ...option, checked: true };
        } else {
          return option;
        }
      });
      this.setSelectedOptions();
    }
  }

  setTitle(selectedValues: string[]): void {
    this.mappedTitle = selectedValues.length === 0 ? this.label : selectedValues.toString();
  }

  onFilterChange(event: CheckboxOption[]): void {
    this.selectedOptions = this.selectedOptions.map(option => {
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
    this.setSelectedOptions();
  }

  setSelectedOptions(): void {
    const selectedOptions = this.selectedOptions.filter(option => option.checked);
    const selectedValues = selectedOptions.map(option => option.value);
    const selectedLabels = selectedOptions.map(option => option.label);
    this.setTitle(selectedLabels);
    this.filterItems.emit(selectedValues);
  }

  deleteFilters(): void {
    this.selectedOptions = this.selectedOptions.map(option => ({ ...option, checked: false }));
    this.mappedTitle = this.label;
    this.filterItems.emit([]);
    this.cdr.detectChanges();
  }
}

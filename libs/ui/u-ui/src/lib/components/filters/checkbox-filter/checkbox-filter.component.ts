import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { IvtFilterComponent } from '../filter';

export interface CheckboxOption {
  label: string;
  value: number;
  checked?: boolean;
}

@Component({
  selector: 'ivt-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IvtCheckboxFilterComponent extends IvtFilterComponent<number[]> implements OnChanges {
  @Input() options: CheckboxOption[] = [];
  @Input() searchable: boolean;
  @Input() disabled: boolean;
  @Input() height = '15vh';
  @Input() width = '275px';
  selectedOptions: CheckboxOption[] = [];
  visibleOptions: CheckboxOption[] = [];
  private optionsFirstChange = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options || changes.label) {
      this.visibleOptions = this.options;
      this.setSelectedOptions();
      this.optionsFirstChange = false;
    }
  }

  setTitle(selectedValues: string[]): void {
    this.mappedTitle = selectedValues.length === 0 ? this.label : selectedValues.toString();
  }

  onFilterChange(event: MatCheckboxChange, value: number): void {
    const index = this.options.findIndex(option => option.value === value);

    if (index === -1) {
      return;
    }

    this.options[index].checked = event.checked;
    this.setSelectedOptions();
  }

  setSelectedOptions(): void {
    const previousSelectedOptions = this.selectedOptions;
    this.selectedOptions = this.options.filter(option => option.checked);

    const selectedValues = this.selectedOptions.map(option => option.value);
    const selectedLabels = this.selectedOptions.map(option => option.label);

    this.setTitle(selectedLabels);

    const emptyFirstChange = this.optionsFirstChange && selectedValues.length === 0;
    if (emptyFirstChange || !this.selectedOptionsDidChange(previousSelectedOptions)) {
      return;
    }

    this.filterItems.emit(selectedValues);
  }

  selectedOptionsDidChange(previousSelectedOption: CheckboxOption[]): boolean {
    if (previousSelectedOption.length !== this.selectedOptions.length) {
      return true;
    }
    for (let i = 0; i < previousSelectedOption.length; i++) {
      if (previousSelectedOption[i].value !== this.selectedOptions[i].value) {
        return true;
      }
    }
    return false;
  }

  deleteFilters(): void {
    this.options = this.options.map(option => ({ ...option, checked: false }));
    this.visibleOptions = this.visibleOptions.map(option => ({ ...option, checked: false }));
    this.selectedOptions = [];
    this.mappedTitle = this.label;
    this.filterItems.emit([]);
  }

  setVisibleOptions(value: string): void {
    const filterValue = value.toLowerCase();

    this.visibleOptions = this.options.filter(option => option.label?.toLowerCase().includes(filterValue));
  }
}

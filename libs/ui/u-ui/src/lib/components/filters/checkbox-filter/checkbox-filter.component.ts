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
  visibleOptions: CheckboxOption[] = [];
  displayContent = true;
  selectedOptions: CheckboxOption[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options || changes.label) {
      this.visibleOptions = this.options;
      this.setSelectedOptions();
    }
  }

  setTitle(selectedValues: string[]): void {
    this.mappedTitle = selectedValues.length === 0 ? this.label : selectedValues.toString();
  }

  onFilterChange(event: CheckboxOption[]): void {
    this.selectedOptions = event;
    this.setSelectedOptions();
  }

  setSelectedOptions(): void {
    const selectedValues = this.selectedOptions.map(option => option.value);
    const selectedLabels = this.selectedOptions.map(option => option.label);
    this.setTitle(selectedLabels);
    this.filterItems.emit(selectedValues);
  }

  deleteFilters(): void {
    this.displayContent = false;
    this.cdr.detectChanges();
    this.options = this.options.map(option => ({ ...option, checked: false }));
    this.visibleOptions = this.visibleOptions.map(option => ({ ...option, checked: false }));
    this.selectedOptions = [];
    this.mappedTitle = this.label;
    this.filterItems.emit([]);
    this.displayContent = true;
    this.cdr.detectChanges();
  }

  setVisibleOptions(value: string): void {
    const filterValue = value.toLowerCase();

    this.visibleOptions = this.options.filter(option => option.label?.toLowerCase().includes(filterValue));
  }
}

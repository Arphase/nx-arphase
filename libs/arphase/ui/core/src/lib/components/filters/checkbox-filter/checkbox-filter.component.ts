import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ApsQueryParams } from '@arphase/common';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export interface CheckboxOption {
  label: string;
  value: number;
  checked?: boolean;
  visible?: boolean;
}

@Component({
  selector: 'aps-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class ApsCheckboxFilterComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @Input() label: string;
  @Input() options: NzSelectOptionInterface[] = [];
  @Input() searchable: boolean;
  @Input() disabled: boolean;
  @Input() height = '25vh';
  @Input() loading: boolean;
  @Input() last: boolean;
  @Input() pageIndex: string;
  mappedTitle: string;
  selected = false;
  setOfCheckedId = new Set<number>();
  setOfCheckedLabel = new Set<string>();
  @Output() filterOptions = new EventEmitter<ApsQueryParams>();
  @Output() filterItems = new EventEmitter<number[]>();

  get checkedIdsArray(): number[] {
    return Array.from(this.setOfCheckedId);
  }

  setTitle(): void {
    const mappedTitle = Array.from(this.setOfCheckedLabel).join(', ');
    this.mappedTitle = mappedTitle.length > 25 ? `${mappedTitle.substring(0, 25)}...` : mappedTitle;
  }

  onItemChecked(option: NzSelectOptionInterface, selected: boolean): void {
    this.updateCheckedSet(option, selected);
    this.refreshCheckedStatus();
    this.setTitle();
  }

  refreshCheckedStatus(): void {
    this.selected = !!this.options.length && this.options.some(item => this.setOfCheckedId.has(item.value));
    this.filterItems.emit(this.checkedIdsArray);
  }

  updateCheckedSet(option: NzSelectOptionInterface, selected: boolean): void {
    selected ? this.setOfCheckedId.add(option.value) : this.setOfCheckedId.delete(option.value);
    selected
      ? this.setOfCheckedLabel.add(option.label as string)
      : this.setOfCheckedLabel.delete(option.label as string);
  }

  deleteFilters(): void {
    this.mappedTitle = this.label;
    this.filterItems.emit([]);
    this.selected = false;
    this.setOfCheckedId.clear();
    this.setOfCheckedLabel.clear();
  }

  filterOptionsText(text: string): void {
    this.filterOptions.emit({ text, pageIndex: '1', resetList: String(true) });
  }

  nextBatch(): void {
    if (this.loading || this.last) {
      return;
    }

    const { end } = this.viewport.getRenderedRange();
    const total = this.viewport.getDataLength();

    if (end === total && end > 0 && total > 0) {
      this.filterOptions.emit({ pageIndex: String(Number(this.pageIndex + 1)), resetList: String(false) });
    }
  }
}

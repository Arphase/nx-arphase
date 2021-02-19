import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Guarantee, guaranteeDateTypeOptions, GuaranteeStatus, Select, statusLabels } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { colorMaps, columns, iconMaps, statusOptions } from './guarantee-list.constants';

@Component({
  selector: 'ivt-guarantee-list',
  templateUrl: './guarantee-list.component.html',
  styleUrls: ['./guarantee-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListComponent extends IvtListComponent<Guarantee> implements OnChanges {
  @Input() clearSelected: boolean;
  @Input() groupOptions: Select[] = [];
  @Input() companyOptions: Select[] = [];
  @Input() userOptions: Select[] = [];
  dateTypeOptions = guaranteeDateTypeOptions;
  statusOptions = statusOptions;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  expandSet = new Set<number>();
  columns = columns;
  colorMaps = colorMaps;
  iconMaps = iconMaps;
  guaranteeStatus = GuaranteeStatus;
  statusLabels = statusLabels;
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number[]>();
  @Output() filterCompanies = new EventEmitter<number[]>();
  @Output() filterUsers = new EventEmitter<number[]>();
  @Output() downloadPaymentOrder = new EventEmitter<number>();
  @Output() updatePaymentOrder = new EventEmitter<number>();
  @Output() editInvoiceNumber = new EventEmitter<Guarantee>();

  get checkedIdsArray(): number[] {
    return Array.from(this.setOfCheckedId);
  }

  get showPaymentOrderButton(): boolean {
    return this.checked || this.indeterminate;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.clearSelected) {
      this.setOfCheckedId.clear();
      this.indeterminate = false;
      this.checked = false;
    }
  }

  updateStatusFilter(status: GuaranteeStatus): void {
    this.filterItems.emit({ status });
  }
  onChangeStatus(id: number, status: GuaranteeStatus): void {
    this.edit.emit({ id, status: status });
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.list.filter(item => !item.amount).forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.list.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.list.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApsListComponent } from '@arphase/ui/core';
import {
  Guarantee,
  guaranteeDateTypeOptions,
  GuaranteeStatus,
  guaranteeStatusLabels,
  UserRoles,
} from '@innovatech/common/domain';
import { REQUIRED_ROLES } from '@innovatech/ui/permissions/data';

import { colorMaps, columns, iconMaps, statusOptions } from './guarantee-list.constants';

@Component({
  selector: 'ivt-guarantee-list',
  templateUrl: './guarantee-list.component.html',
  styleUrls: ['./guarantee-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
  standalone: false,
})
export class GuaranteeListComponent extends ApsListComponent<Guarantee> implements OnChanges {
  @Input() clearSelected: boolean;
  @Input() canCreateGuarantee: boolean;
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
  guaranteeStatusLabels = guaranteeStatusLabels;
  userRoles = UserRoles;
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number[]>();
  @Output() downloadPaymentOrder = new EventEmitter<number>();
  @Output() updatePaymentOrder = new EventEmitter<number>();

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
    this.edit.emit({ id, status });
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
    checked ? this.setOfCheckedId.add(id) : this.setOfCheckedId.delete(id);
  }

  onExpandChange(id: number, expanded: boolean): void {
    expanded ? this.expandSet.add(id) : this.expandSet.delete(id);
  }
}

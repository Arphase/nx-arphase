import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CompanyFormDialogComponent } from '../group-form-companies/group-form-companies.component';
import { columns, dateTypeOptions, statusOptions } from './group-company-list.constants';

@Component({
  selector: 'ivt-group-company-list',
  templateUrl: './group-company-list.component.html',
  styleUrls: ['./group-company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCompanyListComponent extends IvtListComponent<Company> implements OnInit, OnChanges {
  @Input() clearSelected: boolean;
  @Input() retCompanyList;
  @Input() retList = [];
  columns = columns;
  dateTypeOptions = dateTypeOptions;
  statusOptions = statusOptions;
  private companiesSubject = new BehaviorSubject<Company[]>([]);
  companies$ = this.companiesSubject.asObservable();
  selectedIds = new SelectionModel<number>(true, []);
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number[]>();
  @Output() companyList = new EventEmitter<any>();
  @Output() companyListModify = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.companies$.pipe(tap(companies => (this.list = companies))).subscribe();
    if (this.retList.length > 0) {
      this.list = this.retList;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.list) {
      this.companiesSubject.next(this.list);
    }
  }

  open() {
    const dialogRef = this.dialog.open(CompanyFormDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.list.push(result.value);
      this.list = Object.assign([], this.list);
      this.companiesSubject.next(this.list);
      this.companyList.emit(result);
    });
  }

  openWithData(item) {
    var i;
    const dialogRef = this.dialog.open(CompanyFormDialogComponent, {data: item});
    dialogRef.afterClosed().subscribe(result => {
      for (i = 0; i < this.list.length; i++) {
        if(this.list[i].id == item.id) {
          this.list.splice(i, 1)
        }
      }
      this.list.push(result.value);
      this.list = Object.assign([], this.list);
      //this.companiesSubject.next(this.list);
      this.companyListModify.emit(result);
    });
  }

}

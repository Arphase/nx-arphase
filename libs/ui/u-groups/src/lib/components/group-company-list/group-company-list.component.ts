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
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Company} from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CompanyFormDialogComponent } from '../group-form-companies/group-form-companies.component';

import { columns, dateTypeOptions, statusOptions } from './group-company-list.constants';

@Component({
  selector: 'ivt-group-company-list',
  templateUrl: './group-company-list.component.html',
  styleUrls: ['./group-company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class GroupCompanyListComponent extends IvtListComponent<Company> implements OnInit {
  @Output() companyList = new EventEmitter<any>();
  @Input() clearSelected: boolean;
  @Input('retCompanyList') retCompanyList;
  @Input('retList') retList = [];
  columns = columns;
  dateTypeOptions = dateTypeOptions;
  statusOptions = statusOptions;
  private companiesSubject = new BehaviorSubject<Company[]>([]);
  companies$ = this.companiesSubject.asObservable();
  selectedIds = new SelectionModel<number>(true, []);
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number[]>();

  constructor(public dialog: MatDialog) {
    
    super();
  }

  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.list) {
      this.companiesSubject.next(this.list);
    }
  }
  

  ngOnInit() {
    this.companies$.pipe(tap(companies => (this.list = companies))).subscribe();
    
    if(this.retList.length > 0) {
      this.list = this.retList;
    }
  }

  open() {
    let dialogRef = this.dialog.open(CompanyFormDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.list.push(result.value);
      this.list = Object.assign([], this.list);
      this.companiesSubject.next(this.list);
      this.companyList.emit(result);

    })

  }
}

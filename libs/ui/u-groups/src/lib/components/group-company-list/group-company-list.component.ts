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
import { NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CompanyFormDialogComponent } from '../group-form-companies/group-form-companies.component';

import { columns, dateTypeOptions, statusOptions } from './group-company-list.constants';

@Component({
  selector: 'ivt-group-company-list',
  templateUrl: './group-company-list.component.html',
  styleUrls: ['./group-company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbModal]
})
export class GroupCompanyListComponent extends IvtListComponent<Company> implements OnInit {
  @Output() companyList = new EventEmitter<any>();
  @Input() clearSelected: boolean;
  @Input('retCompanyList') retCompanyList;
  columns = columns;
  dateTypeOptions = dateTypeOptions;
  statusOptions = statusOptions;
  private companiesSubject = new BehaviorSubject<Company[]>([]);
  companies$ = this.companiesSubject.asObservable();
  selectedIds = new SelectionModel<number>(true, []);
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number[]>();

  constructor(public dialog: MatDialog, private modalService: NgbModal) {
    
    super();
  }

  /*
  ngOnChanges(changes: SimpleChanges) {
    if(changes.retCompanyList) {
      console.log(this.retCompanyList);
      console.log('Changed list with retCompany')
      this.companiesSubject.next(this.retCompanyList.companies);
      this.list = this.retCompanyList.companies;
      console.log(this.list);
    }
    
  }
  */

  ngOnInit() {
    this.companies$.pipe(tap(companies => (this.list = companies))).subscribe();
  }

  open() {
    let dialogRef = this.dialog.open(CompanyFormDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      //this.list = Object.assign([], this.list);
      //this.list.push(result.value);
      //this.companiesSubject.next(this.list);
      this.companyList.emit(result);

    })
    
    console.log(this.list);

  }
}

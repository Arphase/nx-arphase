import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company, GuaranteeStatus, statusLabels } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { GroupCompanyListComponent } from '../group-company-list/group-company-list.component';
import { CompanyFormDialogComponent } from '../group-form-companies/group-form-companies.component';

@Component({
  selector: 'ivt-company-row',
  templateUrl: './company-row.component.html',
  styleUrls: ['./company-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyRowComponent extends IvtRowComponent<Company> implements OnInit {
  @Input() loading: boolean;
  @Input() loadingStatusChange: boolean;
  @Input() loadingPaymentOrder: boolean;
  @Input() isEditableCompany: boolean;
  //changedItem: any;
  statusLabels = statusLabels;
  
  showStatusSubject = new Subject();
  showStatus$ = this.showStatusSubject.asObservable();
  //private companySubject = new BehaviorSubject<Company>(this.changedItem);
  //company$ = this.companySubject.asObservable();
  visibleStatus$ = this.showStatus$.pipe(
    switchMap(() =>
      timer(0, 1000).pipe(
        take(2),
        map(x => x % 2 === 0)
      )
    )
  );
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() changeStatus = new EventEmitter<Partial<Company>>();
  @Output() downloadPaymentOrder = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number>();
  @Output() updatePaymentOrder = new EventEmitter<number>();
  @Output() company = new EventEmitter<any>();

  constructor(public dialog: MatDialog, public groupCompanyList: GroupCompanyListComponent) {
    super();
  }
  ngOnInit() {
    //this.company$.pipe(tap(company => (this.item = company))).subscribe();
  }


  editCompany() {
    this.groupCompanyList.openWithData(this.item);
  }
}

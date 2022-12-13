import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChange,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsCollectionResponse, ApsCollectionResponseInfo } from '@arphase/common';
import { ApsDataService } from '@arphase/ui/data';
import { mapToSelectOptions, filterNil } from '@arphase/ui/utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParams } from '@ngrx/data';
import { NzSelectComponent, NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { BehaviorSubject, debounceTime, finalize, map, Observable, switchMap, take, tap, withLatestFrom } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[apsDataSelect]',
})
export class DataSelectDirective<T> implements AfterContentInit {
  @Input() queryParams: QueryParams;
  @Input() labelField: string;
  @Input() valueField: string;
  sortValue: { key: string; value: string }[];
  entitiesSubject = new BehaviorSubject<NzSelectOptionInterface[]>([]);
  entities$ = this.entitiesSubject.asObservable();
  infoSubject = new BehaviorSubject<ApsCollectionResponseInfo>(null);
  loading = false;
  private textSearchSubject = new BehaviorSubject<string>(null);
  textSearch$ = this.textSearchSubject.asObservable();
  @Output() valueChanges = new EventEmitter<NzSelectOptionInterface['value']>();

  constructor(
    protected host: NzSelectComponent,
    protected dataService: ApsDataService<T>,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.host.nzShowSearch = true;
    this.host.nzServerSearch = true;
    this.host.nzAllowClear = true;

    this.getData(this.queryParams)
      .pipe(
        take(1),
        map(items => items.results),
        mapToSelectOptions(options => ({ label: options[this.labelField], value: options[this.valueField] }))
      )
      .subscribe(options => this.entitiesSubject.next(options));

    this.entities$.pipe(filterNil(), untilDestroyed(this)).subscribe(options => this.showOptions(options));

    this.textSearch$
      .pipe(
        filterNil(),
        debounceTime(1000),
        untilDestroyed(this),
        switchMap(text =>
          this.getData({
            ...this.queryParams,
            text,
            resetList: String(true),
            pageIndex: String(1),
          })
        ),
        tap(({ info }) => this.infoSubject.next(info)),
        map(({ results }) => results),
        mapToSelectOptions(options => ({ label: options[this.labelField], value: options[this.valueField] }))
      )
      .subscribe(options => this.entitiesSubject.next(options));

    if (this.ngControl.control) {
      this.ngControl.control.valueChanges
        .pipe(untilDestroyed(this), filterNil())
        .subscribe(value => this.valueChanges.emit(value));
    }
  }

  getData(queryParams: QueryParams): Observable<ApsCollectionResponse<T>> {
    this.host.nzLoading = true;
    this.loading = true;
    this.cdr.detectChanges();
    return this.dataService.getWithQuery({ ...queryParams, sort: this.sortValue as unknown as string[] }).pipe(
      finalize(() => {
        this.loading = false;
        this.host.nzLoading = false;
        this.cdr.detectChanges();
      })
    ) as unknown as Observable<ApsCollectionResponse<T>>;
  }

  showOptions(options: NzSelectOptionInterface[]): void {
    const value = this.ngControl?.control?.value;
    this.host.nzOptions = options;
    this.host.ngOnChanges({ nzOptions: new SimpleChange([], options, false) });
    if (options.length === 1 && !value) {
      this.ngControl.control.patchValue(this.host.nzOptions[0].value);
    }
    this.cdr.detectChanges();
  }

  @HostListener('nzOnSearch', ['$event'])
  nzOnSearch(text: string): void {
    this.textSearchSubject.next(text);
  }

  @HostListener('nzScrollToBottom')
  nzScrollToBottom(): void {
    if (this.entitiesSubject.value.length < (this.infoSubject.value?.total ?? 0) && !this.loading) {
      const moreEtities$ = this.getData({
        ...this.queryParams,
        pageIndex: String(this.infoSubject.value.pageIndex + 1),
        resetList: String(false),
      }).pipe(
        map(items => items.results),
        mapToSelectOptions(options => ({ label: options[this.labelField], value: options[this.valueField] }))
      );
      moreEtities$
        .pipe(withLatestFrom(this.entities$), take(1))
        .subscribe(([more, entities]) => this.entitiesSubject.next([...entities, ...more]));
    }
  }
}

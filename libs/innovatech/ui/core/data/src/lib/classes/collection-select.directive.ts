import { AfterContentInit, ChangeDetectorRef, Directive, HostListener, SimpleChange } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { IvtCollectionService } from '../services';

@UntilDestroy()
@Directive()
export abstract class CollectionSelectDirective<T = any> implements AfterContentInit {
  sortValue: any[];

  constructor(
    protected host: NzSelectComponent,
    protected ivtCollectionService: IvtCollectionService<any>,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef
  ) {}

  ngAfterContentInit() {
    this.host.nzShowSearch = true;
    this.host.nzServerSearch = true;
    this.ivtCollectionService.options$.pipe(untilDestroyed(this)).subscribe(options => {
      this.host.nzOptions = options;
      this.host.ngOnChanges({ nzOptions: new SimpleChange([], options, false) });
      if (options.length === 1 && this.ngControl?.control) {
        this.ngControl.control.patchValue(this.host.nzOptions[0].value);
        this.cdr.detectChanges();
      }
    });
  }

  @HostListener('nzOnSearch', ['$event']) nzOnSearch(text: string): void {
    this.ivtCollectionService.queryParams$.pipe(take(1)).subscribe(queryParams =>
      this.ivtCollectionService.getWithQuery({
        ...queryParams,
        sort: this.sortValue,
        text,
        resetList: String(true),
        pageIndex: String(0),
      })
    );
  }

  @HostListener('nzScrollToBottom') nzScrollToBottom(): void {
    combineLatest([
      this.ivtCollectionService.info$,
      this.ivtCollectionService.loading$,
      this.ivtCollectionService.queryParams$,
    ])
      .pipe(
        filter(([info, loading]) => info && !info.last && !loading),
        take(1)
      )
      .subscribe(([info, _, queryParams]) =>
        this.ivtCollectionService.getWithQuery({
          ...queryParams,
          sort: this.sortValue,
          pageIndex: String(info.pageIndex + 1),
          resetList: String(false),
        })
      );
  }
}

import { AfterContentInit, ChangeDetectorRef, Directive, HostListener, SimpleChange } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { combineLatest } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { ApsCollectionService } from '../services';

@UntilDestroy()
@Directive({
  selector: '[apsCollectionSelect]',
})
export class ApsCollectionSelectDirective<T = any> implements AfterContentInit {
  sortValue: any[];

  constructor(
    protected host: NzSelectComponent,
    protected collectionService: ApsCollectionService<any>,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef
  ) {}

  ngAfterContentInit() {
    this.host.nzShowSearch = true;
    this.host.nzServerSearch = true;
    this.host.nzAllowClear = true;
    const value = this.ngControl?.control?.value;
    this.collectionService.options$.pipe(untilDestroyed(this)).subscribe(options => {
      this.host.nzOptions = options;
      this.host.ngOnChanges({ nzOptions: new SimpleChange([], options, false) });
      if (options.length === 1 && this.ngControl?.control) {
        this.ngControl.control.patchValue(this.host.nzOptions[0].value);
        this.cdr.detectChanges();
      }
    });
    if (value) {
      this.collectionService.entityMap$
        .pipe(
          take(1),
          filter(entityMap => !entityMap[value]),
          switchMap(() => this.collectionService.getByKey(value))
        )
        .subscribe(() => {
          this.ngControl?.control.updateValueAndValidity();
          this.cdr.detectChanges();
        });
    }
  }

  @HostListener('nzOnSearch', ['$event']) nzOnSearch(text: string): void {
    this.collectionService.queryParams$.pipe(take(1)).subscribe(queryParams =>
      this.collectionService.getWithQuery({
        ...queryParams,
        sort: this.sortValue,
        text,
        resetList: String(true),
        pageIndex: String(0),
      })
    );
  }

  @HostListener('nzScrollToBottom') nzScrollToBottom(): void {
    combineLatest([this.collectionService.info$, this.collectionService.loading$, this.collectionService.queryParams$])
      .pipe(
        filter(([info, loading]) => info && !info.last && !loading),
        take(1)
      )
      .subscribe(([info, _, queryParams]) =>
        this.collectionService.getWithQuery({
          ...queryParams,
          sort: this.sortValue,
          pageIndex: String(info.pageIndex + 1),
          resetList: String(false),
        })
      );
  }
}

import { ChangeDetectorRef, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsCollectionSelectDirective } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { CategoryFilterCollectionService } from '@musicr/ui/categories/data';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({
  selector: '[mrlCategorySelect]',
})
export class CategorySelectDirective extends ApsCollectionSelectDirective<Category> {
  sortValue = [{ key: 'category.name', value: 'ascend' }];
  constructor(
    protected host: NzSelectComponent,
    protected categoryFilterCollectionService: CategoryFilterCollectionService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef
  ) {
    super(host, categoryFilterCollectionService, ngControl, cdr);
  }
}

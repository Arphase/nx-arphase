import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { CategoryCollectionService } from '@valmira/ui/categories/data';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { of } from 'rxjs';

import { CategorySelectDirective } from './category-select.directive';

describe('CategorySelectDirective', () => {
  @Component({
    selector: 'vma-test',
  })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<CategorySelectDirective>;

  const createDirective = createDirectiveFactory({
    directive: CategorySelectDirective,
    host: HostComponent,
    imports: [NzSelectModule, ReactiveFormsModule],
    providers: [{ provide: CategoryCollectionService, useValue: { options$: of([]) } }],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form"><nz-select formControlName="test" vmaCategorySelect></nz-select></form>`
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});

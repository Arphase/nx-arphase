import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryFilterCollectionService } from '@musicr/ui/categories/data';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { of } from 'rxjs';

import { CategorySelectDirective } from './category-select.directive';

describe('CategorySelectDirective', () => {
  @Component({ selector: 'mrl-test' })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<CategorySelectDirective>;

  const createDirective = createDirectiveFactory({
    directive: CategorySelectDirective,
    host: HostComponent,
    imports: [NzSelectModule, ReactiveFormsModule],
    providers: [{ provide: CategoryFilterCollectionService, useValue: { options$: of([]) } }],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form"><nz-select formControlName="test" mrlCategorySelect></nz-select></form>`
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});

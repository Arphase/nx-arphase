import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubcategoryCollectionService } from '@musicr/ui/subcategories/data';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { of } from 'rxjs';

import { SubcategorySelectDirective } from './subcategory-select.directive';

describe('SubcategorySelectDirective', () => {
  @Component({ selector: 'mrl-test' })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<SubcategorySelectDirective>;

  const createDirective = createDirectiveFactory({
    directive: SubcategorySelectDirective,
    host: HostComponent,
    imports: [NzSelectModule, ReactiveFormsModule],
    providers: [{ provide: SubcategoryCollectionService, useValue: { options$: of([]) } }],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form"><nz-select formControlName="test" mrlSubcategorySelect></nz-select></form>`
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});

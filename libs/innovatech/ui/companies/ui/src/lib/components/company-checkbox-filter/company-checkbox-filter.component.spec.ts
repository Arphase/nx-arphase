import { CompanyCollectionService } from '@innovatech/ui/companies/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { CompanyCheckboxFilterComponent } from './company-checkbox-filter.component';

describe('CompanyCheckboxFilterComponent', () => {
  let spectator: Spectator<CompanyCheckboxFilterComponent>;
  const createComponent = createComponentFactory({
    component: CompanyCheckboxFilterComponent,
    providers: [{ provide: CompanyCollectionService, useValue: { getWithQuery: jest.fn() } }],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

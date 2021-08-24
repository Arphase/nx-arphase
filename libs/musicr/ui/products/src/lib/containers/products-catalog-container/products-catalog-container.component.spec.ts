import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ProductsCatalogContainerComponent } from './products-catalog-container.component';

describe('ProductsCatalogContainerComponent', () => {
  let spectator: Spectator<ProductsCatalogContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductsCatalogContainerComponent,
    schemas: [NO_ERRORS_SCHEMA],
    imports: [HttpClientTestingModule, RouterTestingModule],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

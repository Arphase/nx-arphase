import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ProductDetailContainerComponent } from './product-detail-container.component';

describe('ProductDetailContainerComponent', () => {
  let spectator: Spectator<ProductDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductDetailContainerComponent,
    schemas: [NO_ERRORS_SCHEMA],
    imports: [HttpClientTestingModule, RouterTestingModule],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
